using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
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
        public DbSet<ProjectSkills> ProjectSkills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<ProjectSkills>()
                .HasKey(ps => new { ps.SkillId, ps.ProjectId });

            modelBuilder.Entity<ProjectSkills>()
            .HasOne(ps => ps.Skill)
            .WithMany(s => s.ProjectSkills)
            .HasForeignKey(ps => ps.SkillId);

            modelBuilder.Entity<ProjectSkills>()
            .HasOne(ps => ps.Project)
            .WithMany(s => s.ProjectSkills)
            .HasForeignKey(ps => ps.ProjectId);

            modelBuilder.Entity<EmployeeSkills>()
               .HasKey(ps => new { ps.SkillId, ps.EmployeeId });

            modelBuilder.Entity<EmployeeSkills>()
            .HasOne(ps => ps.Skill)
            .WithMany(s => s.EmployeeSkills)
            .HasForeignKey(ps => ps.SkillId);

            modelBuilder.Entity<EmployeeSkills>()
            .HasOne(ps => ps.Employee)
            .WithMany(s => s.EmployeeSkills)
            .HasForeignKey(ps => ps.EmployeeId);
        }

    }

    
}
