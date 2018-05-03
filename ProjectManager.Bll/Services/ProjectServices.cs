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

        public List<Project> GetProjects()
        {
            return context.Projects.ToList();
        }

        public void AddProject(Project project)
        {   
            context.Projects.Add(project);
            context.SaveChanges();
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
            projectToEdit.Skills = project.Skills;
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
