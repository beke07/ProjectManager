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

        public ProjectServices(ProjectManagerDBContext _context)
        {
            context = _context;
        }

        public List<DboProject> GetProjects()
        {
            List<Project> project = context.Projects.ToList();
            List<DboProject> dboProjects = new List<DboProject>();

            foreach (var item in project)
            {
                DboProject dboProject = new DboProject()
                {
                    Id = item.Id,
                    Company = item.Company,
                    ProjectLeader = item.ProjectLeader,
                    CurrentHours = item.CurrentHours,
                    DueDate = item.DueDate,
                    EmployeesForWeeks = item.EmployeesForWeeks,
                    Name = item.Name,
                    NumberOfWeeks = item.NumberOfWeeks,
                    PlannedHours = item.PlannedHours,
                    Risk = item.Risk,
                    Skills = FindSkillsForProject(item),
                    StartDate = item.StartDate
                };

                dboProjects.Add(dboProject);
            }

            return dboProjects;
        }

        public List<DboSkill> FindSkillsForProject(Project project)
        {
            List<ProjectSkills> projectSkills = new List<ProjectSkills>();
            List<DboSkill> dboSkills = new List<DboSkill>();

            projectSkills = context.ProjectSkills.Where(ps => ps.ProjectId == project.Id).Include(ps => ps.Skill).ToList();

            foreach (var item in projectSkills)
            {
                DboSkill dboSkill = new DboSkill();
                dboSkill.Id = item.Skill.Id;
                dboSkill.Name = item.Skill.Name;
                dboSkills.Add(dboSkill);
            }

            return dboSkills;
        }

        public DboProject AddProject(Project project)
        {
            project.ProjectLeader = context.Employees.Where(e => e.Id == project.ProjectLeader.Id).FirstOrDefault();
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

            DboProject DboProject = new DboProject()
            {
                Id = project.Id,
                Name = project.Name,
                Company = project.Company,
                DueDate = project.DueDate,
                EmployeesForWeeks = project.EmployeesForWeeks,
                NumberOfWeeks = project.NumberOfWeeks,
                PlannedHours = project.PlannedHours,
                ProjectLeader = project.ProjectLeader,
                Risk = project.Risk,
                StartDate = project.StartDate,
                CurrentHours = project.CurrentHours,
                Skills = skills
            };

            return DboProject;
        }

        public void DeleteProject(int projectId)
        {
            Project projectTodelete = FindProjectById(projectId);
            context.Projects.Remove(projectTodelete);
            context.SaveChanges();
        }

        public void EditProject(Project project)
        {
            Project projectToEdit = FindProjectById(project.Id);
            projectToEdit.Company = project.Company;
            projectToEdit.CurrentHours = project.CurrentHours;
            projectToEdit.EmployeesForWeeks = project.EmployeesForWeeks;
            projectToEdit.Name = project.Name;
            projectToEdit.NumberOfWeeks = project.NumberOfWeeks;
            projectToEdit.PlannedHours = project.PlannedHours;
            projectToEdit.ProjectLeader = project.ProjectLeader;
            projectToEdit.Risk = project.Risk;
            projectToEdit.StartDate = project.StartDate;
            projectToEdit.DueDate = project.DueDate;
            context.SaveChanges();
        }

        public Project FindProjectById(int projectId)
        {
            return context.Projects.Where(p => p.Id == projectId).FirstOrDefault();
        }
    }
}
