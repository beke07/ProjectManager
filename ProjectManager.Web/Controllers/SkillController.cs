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

        [HttpPost("[action]")]
        public Skill CreateNewSkill([FromBody] Skill Skill)
        {
            return skillServices.CreateSkill(Skill);
        }

        [HttpPut("[action]")]
        public DboSkill EditSkill([FromBody] Skill skill)
        {
            return skillServices.EditSkill(skill);
        }

        [HttpDelete("[action]")]
        public IEnumerable<Skill> DeleteSkill(int skillid)
        {
            skillServices.DeleteSkill(skillid);
            return skillServices.GetSkills();
        }

        [HttpGet("[action]")]
        public IEnumerable<DboSkill> GetSkillsForProject(int projectId)
        {
            return skillServices.GetSkillsForProject(projectId);
        }

        [HttpGet("[action]")]
        public IEnumerable<DboSkill> GetSkillsForEmployee(int employeeId)
        {
            return skillServices.GetSkillsForEmployee(employeeId);
        }
    }
}