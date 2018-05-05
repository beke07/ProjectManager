using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ProjectManager.Models
{
    public class ProjectForWeeks
    {
        public int Id { get; set; }
        public Project Project { get; set; }
        public List<HourPerWeek> HoursPerWeek { get; set; }
    }
}
