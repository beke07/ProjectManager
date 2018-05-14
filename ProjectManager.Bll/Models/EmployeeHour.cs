using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Bll.Models
{
    public class EmployeeHour
    {
        public Employee Employee { get; set; }
        public int Hour { get; set; }
    }
}
