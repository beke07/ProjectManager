using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace ProjectManager.Dal
{
    class ProjectManagerDBContextFactory : IDesignTimeDbContextFactory<ProjectManagerDBContext>
    {
        public ProjectManagerDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ProjectManagerDBContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=ProjectManagerDB;Trusted_Connection=True;");
            return new ProjectManagerDBContext(optionsBuilder.Options);
        }
    }
}
