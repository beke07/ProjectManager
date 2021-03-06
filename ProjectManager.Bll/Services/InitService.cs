﻿using ProjectManager.Dal;
using ProjectManager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProjectManager.Bll.Services
{
    public class InitService
    {
        private readonly ProjectManagerDBContext context;

        public InitService(ProjectManagerDBContext _context)
        {
            context = _context;
        }

        public void InitializeDatabase()
        {
            if (!context.Skills.Any())
            {
                var skills = new List<Skill>
                {
                    new Skill { Name = "C# Junior developer"},
                    new Skill { Name = "C# Senior developer"},

                    new Skill { Name = "Java Junior developer"},
                    new Skill { Name = "Java Senior developer"},

                    new Skill { Name = "Python Junior developer"},
                    new Skill { Name = "Python Senior developer"},

                    new Skill { Name = "Angular Junior developer"},
                    new Skill { Name = "Angular Senior developer"},

                    new Skill { Name = "C++ Junior developer"},
                    new Skill { Name = "C++ Senior developer"},

                    new Skill { Name = "C Junior developer"},
                    new Skill { Name = "C Senior developer"},

                    new Skill { Name = "Ruby Junior developer"},
                    new Skill { Name = "Ruby Senior developer"},

                    new Skill { Name = "JavaScript Junior developer"},
                    new Skill { Name = "JavaScript Senior developer"}
                };
                context.AddRange(skills);
            }

            if (!context.Employees.Any())
            {
                var emloyees = new List<Employee>
                {
                    new Employee
                    {
                        Name = "Tóth Tibor",
                        Email = "toth.tibor@aut.bme.hu",
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    },
                    new Employee
                    {
                        Name = "Ferenczi Judit",
                        Email = "ferenczi.judit@aut.bme.hu",
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    },
                    new Employee
                    {
                        Name = "Ambrus Attila",
                        Email = "ambrus.attila@aut.bme.hu",
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    },
                    new Employee
                    {
                        Name = "Kellner Menyhárt",
                        Email = "kellner.menyhart@aut.bme.hu",
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    }
                };
                context.AddRange(emloyees);
            }

            if (!context.Projects.Any())
            {
                var projects = new List<Project>
                {
                    new Project
                    {
                        Name = "Project X",
                        Company = "DreamWorks",
                        Risk = 0.1,
                        StartDate = DateTime.Now,
                        DueDate = new DateTime(2019,01,01),
                        CurrentHours = 0,
                        ProjectLeader = new Employee(),
                        PlannedHours = 200,
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    },
                    new Project
                    {
                        Name = "Man on the mooN",
                        Company = "GraphiSoft",
                        Risk = 0.1,
                        StartDate = DateTime.Now,
                        DueDate = new DateTime(2019,01,01),
                        CurrentHours = 0,
                        ProjectLeader = new Employee(),
                        PlannedHours = 200,
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    },
                    new Project
                    {
                        Name = "Monitor",
                        Company = "LG",
                        Risk = 0.1,
                        StartDate = DateTime.Now,
                        DueDate = new DateTime(2019,01,01),
                        CurrentHours = 0,
                        ProjectLeader = new Employee(),
                        PlannedHours = 200,
                        EmployeeProjectHourPerWeeks = new List<EmployeeProjectHourPerWeeks>()
                    }
                };
                context.AddRange(projects);
            }
            context.SaveChanges();
        }
    }
}
