using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectManager.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        //Hány órát van alkalmazva hetente
        public int HoursPerWeek { get; set; }

        //Hány óra olyan dolga van ami nem a projektkhez kapcsolódik
        public int OtherThingsToDoForWeeks { get; set; }
        public List<EmployeeSkills> EmployeeSkills { get; set; }
        public List<ProjectForWeeks> ProjectsForWeeks { get; set; }
    }
}
