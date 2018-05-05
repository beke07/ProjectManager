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
    public class SkillController : Controller
    {
        private SkillServices skillServices;

        public SkillController(ProjectManagerDBContext _context)
        {
            skillServices = new SkillServices(_context);
        }

        [HttpGet("[action]")]
        public IEnumerable<Skill> GetSkillList()
        {
            return skillServices.GetSkills();
        }
    }
}