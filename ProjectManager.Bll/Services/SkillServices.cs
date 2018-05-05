using ProjectManager.Dal;
using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProjectManager.Bll.Services
{
    public class SkillServices
    {
        private readonly ProjectManagerDBContext context;

        public SkillServices(ProjectManagerDBContext _context)
        {
            context = _context;
        }

        public List<Skill> GetSkills()
        {
            return context.Skills.ToList();
        }
    }
}
