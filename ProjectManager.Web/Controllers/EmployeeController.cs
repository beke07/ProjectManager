using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public IEnumerable<Employee> GetEmployeeList()
        {
            return employeeServices.GetEmployees();
        }
    }
}