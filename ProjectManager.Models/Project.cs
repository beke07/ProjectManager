using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ProjectManager.Models
{
    public class Project
    {
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
        public List<ProjectSkills> ProjectSkills { get; set; }
        public List<EmployeeForWeeks> EmployeesForWeeks { get; set; }
    }
}
