using Microsoft.EntityFrameworkCore;
using ProjectManager.Bll.Models;
using ProjectManager.Dal;
using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace ProjectManager.Bll.Services
{
    public class EmployeeServices
    {
        private readonly ProjectManagerDBContext context;
        private SkillServices skillServices;

        public EmployeeServices(ProjectManagerDBContext _context)
        {
            context = _context;
            skillServices = new SkillServices(context);
        }

        public List<DboEmployee> GetEmployees()
        {
            List<Employee> employees = context.Employees.ToList();
            List<DboEmployee> dboEmployees = new List<DboEmployee>();

            foreach (var item in employees)
            {
                DboEmployee dboEmployee = (DboEmployee)item;
                dboEmployee.Skills = skillServices.GetSkillsForEmployee(item.Id);
                dboEmployees.Add(dboEmployee);
            }

            return dboEmployees;

        }

        public DboEmployee CreateEmployee(Employee employee)
        {
            context.Employees.Add(employee);
            context.SaveChanges();

            List<DboSkill> skills = new List<DboSkill>();

            foreach (var item in employee.EmployeeSkills)
            {
                Skill skill = context.Skills.Where(s => s.Id == item.SkillId).FirstOrDefault();
                DboSkill dboSkill = new DboSkill()
                {
                    Id = skill.Id,
                    Name = skill.Name
                };

                skills.Add(dboSkill);
            }

            DboEmployee dboEmployee = (DboEmployee)employee;
            dboEmployee.Skills = skills;

            return dboEmployee;
        }

        public bool DeleteEmployee(int employeeId)
        {
            try
            {
                Employee employeeTodelete = FindEmployeeById(employeeId);
                context.Employees.Remove(employeeTodelete);
                context.SaveChanges();
                return true;
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
           
        }

        public DboEmployee EditEmployee(Employee employee)
        {
            List<EmployeeSkills> employeeSkills = context.EmployeeSkills.Where(es => es.EmployeeId== employee.Id).ToList();
            context.EmployeeSkills.RemoveRange(employeeSkills);
            context.SaveChanges();

            Employee employeeToEdit = FindEmployeeById(employee.Id);
            employeeToEdit.Name = employee.Name;
            employeeToEdit.Email = employee.Email;
            employeeToEdit.ProjectsForWeeks = employee.ProjectsForWeeks;
            employeeToEdit.EmployeeSkills = employee.EmployeeSkills;
            context.SaveChanges();

            DboEmployee dboEmployee = (DboEmployee)employeeToEdit;
            dboEmployee.Skills = skillServices.GetSkillsForEmployee(employee.Id);
            return dboEmployee;
        }

        public Employee FindEmployeeById(int employeeId)
        {
            return context.Employees.Where(e => e.Id == employeeId).FirstOrDefault();
        }
    }
}
