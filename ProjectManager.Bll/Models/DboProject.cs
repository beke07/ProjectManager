using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Bll.Models
{
    public class DboProject
    {
        public DboProject()
        {
        }

        public DboProject(Project project)
        {
            Id = project.Id;
            Name = project.Name;
            Company = project.Company;
            DueDate = project.DueDate;
            EmployeeProjectHourPerWeeks = project.EmployeeProjectHourPerWeeks;
            NumberOfWeeks = project.NumberOfWeeks;
            PlannedHours = project.PlannedHours;
            Risk = project.Risk;
            ProjectLeader = project.ProjectLeader;
            StartDate = project.StartDate;
            CurrentHours = project.CurrentHours;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Employee ProjectLeader { get; set; }
        public string Company { get; set; }
        public double Risk { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public double NumberOfWeeks { get; set; }
        public int PlannedHours { get; set; }
        public int CurrentHours { get; set; }
        public List<DboSkill> Skills { get; set; }
        public List<EmployeeProjectHourPerWeeks> EmployeeProjectHourPerWeeks { get; set; }

        public static explicit operator DboProject(Project project)
        {
            DboProject dboProject = new DboProject(project);
            return dboProject;
        }
    }
}
