using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Bll.Models
{
    public class DboEmployee
    {
        public DboEmployee()
        {
        }

        public DboEmployee(Employee employee)
        {
            Id = employee.Id;
            Name = employee.Name;
            Email = employee.Email;
            HoursPerWeek = employee.HoursPerWeek;
            OtherThingsToDoForWeeks = employee.OtherThingsToDoForWeeks;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<DboSkill> Skills { get; set; }
        public int HoursPerWeek { get; set; }
        public int OtherThingsToDoForWeeks { get; set; }
        public List<EmployeeProjectHourPerWeeks> EmployeeProjectHourPerWeeks { get; set; }

        public static explicit operator DboEmployee(Employee employee)
        {
            DboEmployee dboEmployee = new DboEmployee(employee);
            return dboEmployee;
        }
    }
}
