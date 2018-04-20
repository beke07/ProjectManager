using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ProjectManager.Models
{
    public class HourPerWeek
    {
        public int Id { get; set; }
        public int Hour { get; set; }
    }
}
