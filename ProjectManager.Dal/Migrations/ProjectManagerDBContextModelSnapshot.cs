﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
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

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("ProjectManager.Models.EmployeeForWeeks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeId");

                    b.Property<int?>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ProjectId");

                    b.ToTable("EmployeeForWeeks");
                });

            modelBuilder.Entity("ProjectManager.Models.HourPerWeek", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeForWeeksId");

                    b.Property<int>("Hour");

                    b.Property<int?>("ProjectForWeeksId");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeForWeeksId");

                    b.HasIndex("ProjectForWeeksId");

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

                    b.Property<int>("NumberOfWeeks");

                    b.Property<int>("PlannedHours");

                    b.Property<int?>("ProjectLeaderId");

                    b.Property<double>("Risk");

                    b.Property<DateTime>("StartDate");

                    b.HasKey("Id");

                    b.HasIndex("ProjectLeaderId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("ProjectManager.Models.ProjectForWeeks", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeId");

                    b.Property<int?>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectForWeeks");
                });

            modelBuilder.Entity("ProjectManager.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("EmployeeForWeeksId");

                    b.Property<int?>("EmployeeId");

                    b.Property<string>("Name");

                    b.Property<int?>("ProjectForWeeksId");

                    b.Property<int?>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeForWeeksId");

                    b.HasIndex("EmployeeId");

                    b.HasIndex("ProjectForWeeksId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("ProjectManager.Models.EmployeeForWeeks", b =>
                {
                    b.HasOne("ProjectManager.Models.Employee", "Employee")
                        .WithMany()
                        .HasForeignKey("EmployeeId");

                    b.HasOne("ProjectManager.Models.Project")
                        .WithMany("EmployeesForWeeks")
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("ProjectManager.Models.HourPerWeek", b =>
                {
                    b.HasOne("ProjectManager.Models.EmployeeForWeeks")
                        .WithMany("HoursPerWeek")
                        .HasForeignKey("EmployeeForWeeksId");

                    b.HasOne("ProjectManager.Models.ProjectForWeeks")
                        .WithMany("HoursPerWeek")
                        .HasForeignKey("ProjectForWeeksId");
                });

            modelBuilder.Entity("ProjectManager.Models.Project", b =>
                {
                    b.HasOne("ProjectManager.Models.Employee", "ProjectLeader")
                        .WithMany()
                        .HasForeignKey("ProjectLeaderId");
                });

            modelBuilder.Entity("ProjectManager.Models.ProjectForWeeks", b =>
                {
                    b.HasOne("ProjectManager.Models.Employee")
                        .WithMany("ProjectsForWeeks")
                        .HasForeignKey("EmployeeId");

                    b.HasOne("ProjectManager.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("ProjectManager.Models.Skill", b =>
                {
                    b.HasOne("ProjectManager.Models.EmployeeForWeeks")
                        .WithMany("Skills")
                        .HasForeignKey("EmployeeForWeeksId");

                    b.HasOne("ProjectManager.Models.Employee")
                        .WithMany("Skills")
                        .HasForeignKey("EmployeeId");

                    b.HasOne("ProjectManager.Models.ProjectForWeeks")
                        .WithMany("Skills")
                        .HasForeignKey("ProjectForWeeksId");

                    b.HasOne("ProjectManager.Models.Project")
                        .WithMany("Skills")
                        .HasForeignKey("ProjectId");
                });
#pragma warning restore 612, 618
        }
    }
}