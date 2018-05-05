using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Models
{
    public class EmployeeSkills
    {
        public int SkillId { get; set; }
        public Skill Skill { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}
