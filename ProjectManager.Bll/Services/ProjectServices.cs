using Microsoft.EntityFrameworkCore;
using ProjectManager.Bll.Models;
using ProjectManager.Dal;
using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProjectManager.Bll.Services
{
    public class ProjectServices
    {
        private readonly ProjectManagerDBContext context;
        private SkillServices skillServices;
        private EmployeeServices employeeServices;

        public ProjectServices(ProjectManagerDBContext _context)
        {
            context = _context;
            skillServices = new SkillServices(context);
            employeeServices = new EmployeeServices(context);
        }

        public List<DboProject> GetProjects()
        {
            List<Project> projects = context.Projects.Include(p => p.ProjectLeader).ToList();
            List<DboProject> dboProjects = new List<DboProject>();

            foreach (var item in projects)
            {
                DboProject dboProject = (DboProject)item;
                dboProject.Skills = skillServices.GetSkillsForProject(item.Id);
                dboProjects.Add(dboProject);
            }

            return dboProjects;
        }

        public DboProject CreateProject(Project project)
        {
            project.ProjectLeader = employeeServices.FindEmployeeById(project.ProjectLeader.Id);
            context.Projects.Add(project);
            context.SaveChanges();

            List<DboSkill> skills = new List<DboSkill>();

            foreach (var item in project.ProjectSkills)
            {
                Skill skill = context.Skills.Where(s => s.Id == item.SkillId).FirstOrDefault();
                DboSkill dboSkill = new DboSkill()
                {
                    Id = skill.Id,
                    Name = skill.Name
                };

                skills.Add(dboSkill);
            }

            DboProject dboProject = (DboProject)project;
            dboProject.Skills = skills;

            return dboProject;
        }

        public void DeleteProject(int projectId)
        {
            Project projectTodelete = FindProjectById(projectId);
            context.Projects.Remove(projectTodelete);
            context.SaveChanges();
        }

        public DboProject EditProject(Project project)
        {
            List<ProjectSkills> projectSkills = context.ProjectSkills.Where(ps => ps.ProjectId == project.Id).ToList();
            context.ProjectSkills.RemoveRange(projectSkills);
            context.SaveChanges();

            Project projectToEdit = FindProjectById(project.Id);
            projectToEdit.Company = project.Company;
            projectToEdit.CurrentHours = project.CurrentHours;
            projectToEdit.EmployeesForWeeks = project.EmployeesForWeeks;
            projectToEdit.Name = project.Name;
            projectToEdit.NumberOfWeeks = project.NumberOfWeeks;
            projectToEdit.PlannedHours = project.PlannedHours;
            projectToEdit.ProjectLeader = employeeServices.FindEmployeeById(project.ProjectLeader.Id);
            projectToEdit.Risk = project.Risk;
            projectToEdit.StartDate = project.StartDate;
            projectToEdit.DueDate = project.DueDate;
            projectToEdit.ProjectSkills = project.ProjectSkills;
            context.SaveChanges();

            DboProject dboProject = (DboProject)projectToEdit;
            dboProject.Skills = skillServices.GetSkillsForProject(projectToEdit.Id);
            return dboProject;
        }

        public Project FindProjectById(int projectId)
        {
            return context.Projects.Where(p => p.Id == projectId).FirstOrDefault();
        }
    }
}
