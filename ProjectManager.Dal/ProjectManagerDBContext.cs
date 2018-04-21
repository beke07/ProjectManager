using Microsoft.EntityFrameworkCore;
using ProjectManager.Models;

namespace ProjectManager.Dal
{
    public class ProjectManagerDBContext : DbContext
    {
        public ProjectManagerDBContext(DbContextOptions<ProjectManagerDBContext> options) : base(options)
        {

        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Skill> Skills { get; set; }
    }
}
