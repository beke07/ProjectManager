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
    public class ProjectController : Controller
    {
        private ProjectServices projectServices;
        public ProjectController(ProjectManagerDBContext _context)
        {
            projectServices = new ProjectServices(_context);
        }

        [HttpGet("[action]")]
        public IEnumerable<Project> GetProjectList()
        {
            return projectServices.GetProjects();
        }

        [HttpPost("[action]")]
        public Project CreateNewProject([FromBody] Project Project)
        {
            projectServices.AddProject(Project);
            return Project;
        }

        [HttpDelete("[action]")]
        public IEnumerable<Project> DeleteProject(string projectId)
        {
            projectServices.DeleteProject(int.Parse(projectId));
            return projectServices.GetProjects();
        }

        [HttpPut("[action]")]
        public Project EditProject([FromBody] Project project)
        {
            projectServices.EditProject(project);
            return project;
        }
    }
}