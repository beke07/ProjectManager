using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectManager.Bll.Models;
using ProjectManager.Bll.Services;
using ProjectManager.Dal;
using ProjectManager.Models;

namespace ProjectManager.Web.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        private EmployeeServices employeeServices;

        public EmployeeController(ProjectManagerDBContext _context)
        {
            employeeServices = new EmployeeServices(_context);
        }

        [HttpGet("[action]")]
        public IEnumerable<DboEmployee> GetEmployeeList()
        {
            return employeeServices.GetEmployees();
        }

        [HttpPost("[action]")]
        public DboEmployee CreateNewEmployee([FromBody] Employee Employee)
        {
            return employeeServices.CreateEmployee(Employee);
        }

        [HttpPut("[action]")]
        public DboEmployee EditEmployee([FromBody] Employee employee)
        {
            return employeeServices.EditEmployee(employee);
        }

        [HttpDelete("[action]")]
        public bool DeleteEmployee(string employeeId)
        {
           return employeeServices.DeleteEmployee(int.Parse(employeeId));
        }
    }
}