using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Bll.Models
{
    public class DboProject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Employee ProjectLeader { get; set; }
        public string Company { get; set; }
        public double Risk { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }
        public int NumberOfWeeks { get; set; }
        public int PlannedHours { get; set; }
        public int CurrentHours { get; set; }
        public List<DboSkill> Skills { get; set; }
        public List<EmployeeForWeeks> EmployeesForWeeks { get; set; }
    }
}
