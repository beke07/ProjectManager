using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProjectManager.Bll.Services;
using ProjectManager.Dal;

namespace ProjectManager.Web.Controllers
{
    public class HomeController : Controller
    {
        private InitService initService;

        public HomeController(ProjectManagerDBContext _context)
        {
            initService = new InitService(_context);
            initService.InitializeDatabase();
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }
    }
}
