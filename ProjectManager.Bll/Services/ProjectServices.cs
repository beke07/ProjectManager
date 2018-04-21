using ProjectManager.Dal;
using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Bll.Services
{
    class ProjectServices
    {
        private readonly ProjectManagerDBContext context;

        public ProjectServices(ProjectManagerDBContext _context)
        {
            context = _context;
        }
    }
}
