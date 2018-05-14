using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Models
{
    public class EmployeeProjectHourPerWeeks
    {
        public int Id { get; set; }
        public List<HourPerWeek> HoursPerWeeks { get; set; }
        public Project Project { get; set; }
        public Employee Employee { get; set; }
    }
}
