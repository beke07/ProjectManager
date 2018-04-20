using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ProjectManager.Models
{
    public class EmployeeForWeeks
    {
        public int Id { get; set; }
        public Employee Employee { get; set; }
        public List<Skill> Skills { get; set; }
        public List<HourPerWeek> HoursPerWeek { get; set; }
    }
}
