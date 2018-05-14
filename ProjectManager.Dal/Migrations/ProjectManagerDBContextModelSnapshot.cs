﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ProjectManager.Dal;
using System;

namespace ProjectManager.Dal.Migrations
{
    [DbContext(typeof(ProjectManagerDBContext))]
    partial class ProjectManagerDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ProjectManager.Models.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<int>("HoursPerWeek");

                    b.Property<string>("Name");

                    b.Property<int>("OtherThingsToDoForWeeks");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("ProjectManager.Models.EmployeeProjectHourPerWeeks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeId");

                    b.Property<int?>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ProjectId");

                    b.ToTable("EmployeeProjectHourPerWeeks");
                });

            modelBuilder.Entity("ProjectManager.Models.EmployeeSkills", b =>
                {
                    b.Property<int>("SkillId");

                    b.Property<int>("EmployeeId");

                    b.HasKey("SkillId", "EmployeeId");

                    b.HasIndex("EmployeeId");

                    b.ToTable("EmployeeSkills");
                });

            modelBuilder.Entity("ProjectManager.Models.HourPerWeek", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeProjectHourPerWeeksId");

                    b.Property<int>("Hour");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeProjectHourPerWeeksId");

                    b.ToTable("HourPerWeek");
                });

            modelBuilder.Entity("ProjectManager.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Company");

                    b.Property<int>("CurrentHours");

                    b.Property<DateTime>("DueDate");

                    b.Property<string>("Name");

                    b.Property<double>("NumberOfWeeks");

                    b.Property<int>("PlannedHours");

                    b.Property<int?>("ProjectLeaderId");

                    b.Property<double>("Risk");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("ProjectLeaderId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("ProjectManager.Models.ProjectSkills", b =>
                {
                    b.Property<int>("SkillId");

                    b.Property<int>("ProjectId");

                    b.HasKey("SkillId", "ProjectId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectSkills");
                });

            modelBuilder.Entity("ProjectManager.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("ProjectManager.Models.EmployeeProjectHourPerWeeks", b =>
                {
                    b.HasOne("ProjectManager.Models.Employee", "Employee")
                        .WithMany("EmployeeProjectHourPerWeeks")
                        .HasForeignKey("EmployeeId");

                    b.HasOne("ProjectManager.Models.Project", "Project")
                        .WithMany("EmployeeProjectHourPerWeeks")
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("ProjectManager.Models.EmployeeSkills", b =>
                {
                    b.HasOne("ProjectManager.Models.Employee", "Employee")
                        .WithMany("EmployeeSkills")
                        .HasForeignKey("EmployeeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectManager.Models.Skill", "Skill")
                        .WithMany("EmployeeSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectManager.Models.HourPerWeek", b =>
                {
                    b.HasOne("ProjectManager.Models.EmployeeProjectHourPerWeeks")
                        .WithMany("HoursPerWeeks")
                        .HasForeignKey("EmployeeProjectHourPerWeeksId");
                });

            modelBuilder.Entity("ProjectManager.Models.Project", b =>
                {
                    b.HasOne("ProjectManager.Models.Employee", "ProjectLeader")
                        .WithMany()
                        .HasForeignKey("ProjectLeaderId");
                });

            modelBuilder.Entity("ProjectManager.Models.ProjectSkills", b =>
                {
                    b.HasOne("ProjectManager.Models.Project", "Project")
                        .WithMany("ProjectSkills")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ProjectManager.Models.Skill", "Skill")
                        .WithMany("ProjectSkills")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
