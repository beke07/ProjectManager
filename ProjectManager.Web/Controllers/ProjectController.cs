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
    public class ProjectController : Controller
    {
        private ProjectServices projectServices;

        public ProjectController(ProjectManagerDBContext _context)
        {
            projectServices = new ProjectServices(_context);
        }

        [HttpGet("[action]")]
        public IEnumerable<DboProject> GetProjectList()
        {
            return projectServices.GetProjects();
        }

        [HttpPost("[action]")]
        public DboProject CreateNewProject([FromBody] Project Project)
        {
            return projectServices.CreateProject(Project);
        }

        [HttpDelete("[action]")]
        public IEnumerable<DboProject> DeleteProject(string projectId)
        {
            projectServices.DeleteProject(int.Parse(projectId));
            return projectServices.GetProjects();
        }

        [HttpPut("[action]")]
        public DboProject EditProject([FromBody] Project project)
        {
            return projectServices.EditProject(project);
        }
    }
}