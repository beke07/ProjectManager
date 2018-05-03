using ProjectManager.Dal;
using ProjectManager.Models;
using System.Collections.Generic;
using System.Linq;

namespace ProjectManager.Bll.Services
{
    public class EmployeeServices
    {
        private readonly ProjectManagerDBContext context;

        public EmployeeServices(ProjectManagerDBContext _context)
        {
            context = _context;
        }

        public List<Employee> GetEmployees()
        {
            return context.Employees.Where(e => e.Name != null).ToList();
        }

        public void AddEmployee(Employee employee)
        {
            context.Employees.Add(employee);
            context.SaveChanges();
        }

        public void DeleteEmployee(int employeeId)
        {
            Employee employeeTodelete = FindEmployeeById(employeeId);
            context.Employees.Remove(employeeTodelete);
            context.SaveChanges();
        }

        public void EditEmployee(Employee employee)
        {
            Employee employeeToEdit = FindEmployeeById(employee.Id);
            employeeToEdit.Name = employee.Name;
            employeeToEdit.Email = employee.Email;
            employeeToEdit.ProjectsForWeeks = employee.ProjectsForWeeks;
            employeeToEdit.Skills = employee.Skills;
            context.SaveChanges();
        }

        public Employee FindEmployeeById(int employeeId)
        {
            return context.Employees.Where(e => e.Id == employeeId).FirstOrDefault();
        }
    }
}
