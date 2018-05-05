using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Models
{
    public class ProjectSkills
    {
        public int SkillId { get; set; }
        public Skill Skill { get; set; }

        public int ProjectId { get; set; }
        public Project Project { get; set; }
    }
}
