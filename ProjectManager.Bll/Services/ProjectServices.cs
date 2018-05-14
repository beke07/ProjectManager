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

        public IEnumerable<HourPerWeek> GetEmployeesHoursPerWeek(int employeeId, int projectId)
        {
            List<EmployeeProjectHourPerWeeks> employeeProjectHourPerWeeks = context.EmployeeProjectHourPerWeeks.Include(e => e.Employee).Include(e => e.Project).Include(e => e.HoursPerWeeks).Where(e => e.Employee.Id == employeeId && e.Project.Id == projectId).ToList();

            Employee employee = employeeServices.FindEmployeeById(employeeId);
            Project project = FindProjectById(projectId);

            List<HourPerWeek> hoursPerWeeks = new List<HourPerWeek>();

            int startOfProjectInCalendarWeek = HelperServices.GetWeekOfYear(project.StartDate);
            int endOfProjectInCalendarWeek = (startOfProjectInCalendarWeek + Convert.ToInt32(project.NumberOfWeeks));

            int endOfTheInvestigation = endOfProjectInCalendarWeek;
            for (int i = startOfProjectInCalendarWeek; i < endOfTheInvestigation; i++)
            {
                HourPerWeek hourPerWeek = new HourPerWeek();
                hourPerWeek.Hour = employee.HoursPerWeek - employee.OtherThingsToDoForWeeks;

                foreach (var projectForWeeks in employeeProjectHourPerWeeks)
                {

                    int startOfThisProject = HelperServices.GetWeekOfYear(projectForWeeks.Project.StartDate);
                    int endOfThisProject = HelperServices.GetWeekOfYear(projectForWeeks.Project.DueDate);
                
                    if(endOfThisProject < endOfProjectInCalendarWeek)
                    {
                        endOfTheInvestigation = endOfThisProject;
                    }

                    if (startOfThisProject <= i)
                    {
                        int incrementWeek = i - startOfThisProject;
                        hourPerWeek.Hour -= projectForWeeks.HoursPerWeeks[incrementWeek].Hour;
                    }
                }

                hoursPerWeeks.Add(hourPerWeek);
            }

            return hoursPerWeeks;
        }

        public ProjectIDEmployee AddEmployeeToProject(ProjectIDEmployee projectIDEmployee)
        {
            Project project = context.Projects.Include(p => p.EmployeeProjectHourPerWeeks).Where(p => p.Id == projectIDEmployee.ProjectId).FirstOrDefault();
            Employee employee = employeeServices.FindEmployeeById(projectIDEmployee.EmployeeId);
            List<HourPerWeek> hours = (List<HourPerWeek>)GetEmployeesHoursPerWeek(projectIDEmployee.EmployeeId, projectIDEmployee.ProjectId);

            int current = 0;
            foreach (var item in hours)
            {
                current += item.Hour;
            }
            project.CurrentHours = current;

            EmployeeProjectHourPerWeeks employeeProjectHourPerWeeks = new EmployeeProjectHourPerWeeks();
            employeeProjectHourPerWeeks.Employee = employee;
            employeeProjectHourPerWeeks.Project = project;
            employeeProjectHourPerWeeks.HoursPerWeeks = hours;

            employee.EmployeeProjectHourPerWeeks.Add(employeeProjectHourPerWeeks);
            project.EmployeeProjectHourPerWeeks.Add(employeeProjectHourPerWeeks);
            context.SaveChanges();

            context.SaveChanges();
            return projectIDEmployee;
        }

        public IEnumerable<HourPerWeek> GetEmployeesForWeeks(int projectId)
        {
            List<EmployeeProjectHourPerWeeks> employeeProjectHourPerWeeks = context.EmployeeProjectHourPerWeeks.Include(e => e.HoursPerWeeks).Include(e => e.Project).Where(e => e.Project.Id == projectId).ToList();
            Project project = FindProjectById(projectId);
            List<HourPerWeek> hours = new List<HourPerWeek>();

            for (int j = 0; j < project.NumberOfWeeks; j++)
            {
                HourPerWeek hourPerWeek = new HourPerWeek();
                hourPerWeek.Hour = 0;
                for (int i = 0; i < employeeProjectHourPerWeeks.Count; i++)
                {
                    hourPerWeek.Hour += employeeProjectHourPerWeeks[i].HoursPerWeeks[j].Hour;
                }
                hours.Add(hourPerWeek);
            }
            return hours;
        }

        public DboProject CreateProject(Project project)
        {
            project.ProjectLeader = employeeServices.FindEmployeeById(project.ProjectLeader.Id);
            project.NumberOfWeeks = HelperServices.GetWeekOfYear(project.DueDate) - HelperServices.GetWeekOfYear(project.StartDate);
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
            Project projectTodelete = context.Projects.Where(p => p.Id == projectId).FirstOrDefault();
            List<EmployeeProjectHourPerWeeks> employeeProjectHourPerWeeks = context.EmployeeProjectHourPerWeeks.Include(e => e.HoursPerWeeks).Where(e => e.Project.Id == projectTodelete.Id).ToList();

            foreach (var item in employeeProjectHourPerWeeks)
            {

                foreach (var hour in item.HoursPerWeeks)
                {
                    hour.Hour = 0;
                }
                item.HoursPerWeeks.Clear();
            }
            context.SaveChanges();

            context.HourPerWeek.RemoveRange(context.HourPerWeek.Where(h => h.Hour == 0).ToList());
            context.EmployeeProjectHourPerWeeks.RemoveRange(employeeProjectHourPerWeeks);

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
            projectToEdit.EmployeeProjectHourPerWeeks = project.EmployeeProjectHourPerWeeks;
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
