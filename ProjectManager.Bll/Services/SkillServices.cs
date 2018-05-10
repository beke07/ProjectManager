using Microsoft.EntityFrameworkCore;
using ProjectManager.Bll.Models;
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

        public List<DboSkill> GetSkillsForProject(int projectId)
        {
            List<ProjectSkills> projectSkills = new List<ProjectSkills>();
            List<DboSkill> dboSkills = new List<DboSkill>();

            projectSkills = context.ProjectSkills.Where(ps => ps.ProjectId == projectId).Include(ps => ps.Skill).ToList();

            foreach (var item in projectSkills)
            {
                DboSkill dboSkill = new DboSkill();
                dboSkill.Id = item.Skill.Id;
                dboSkill.Name = item.Skill.Name;
                dboSkills.Add(dboSkill);
            }

            return dboSkills;
        }

        public void DeleteSkill(int skillid)
        {
            Skill skillToDelete = context.Skills.Where(s => s.Id == skillid).FirstOrDefault();
            context.Skills.Remove(skillToDelete);
            context.SaveChanges();
        }

        public DboSkill EditSkill(Skill skill)
        {
            Skill skillToEdit = context.Skills.Where(s => s.Id == skill.Id).FirstOrDefault();
            skillToEdit.Name = skill.Name;
            context.SaveChanges();

            DboSkill dboSkill = new DboSkill();
            dboSkill.Id = skill.Id;
            dboSkill.Name = skill.Name;

            return dboSkill;

        }

        public Skill CreateSkill(Skill skill)
        {
            context.Skills.Add(skill);
            context.SaveChanges();

            return skill;
        }

        public List<DboSkill> GetSkillsForEmployee(int employeeId)
        {
            List<EmployeeSkills> employeeSkills = new List<EmployeeSkills>();
            List<DboSkill> dboSkills = new List<DboSkill>();

            employeeSkills = context.EmployeeSkills.Where(ps => ps.EmployeeId == employeeId).Include(ps => ps.Skill).ToList();

            foreach (var item in employeeSkills)
            {
                DboSkill dboSkill = new DboSkill();
                dboSkill.Id = item.Skill.Id;
                dboSkill.Name = item.Skill.Name;
                dboSkills.Add(dboSkill);
            }

            return dboSkills;

        }
    }
}
