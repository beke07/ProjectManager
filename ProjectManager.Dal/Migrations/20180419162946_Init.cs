using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ProjectManager.Dal.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Company = table.Column<string>(nullable: true),
                    CurrentHours = table.Column<int>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    NumberOfWeeks = table.Column<int>(nullable: false),
                    PlannedHours = table.Column<int>(nullable: false),
                    ProjectLeaderId = table.Column<int>(nullable: true),
                    Risk = table.Column<double>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Employees_ProjectLeaderId",
                        column: x => x.ProjectLeaderId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "EmployeeForWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeForWeeks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeForWeeks_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeForWeeks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProjectForWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectForWeeks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectForWeeks_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProjectForWeeks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HourPerWeek",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeForWeeksId = table.Column<int>(nullable: true),
                    Hour = table.Column<int>(nullable: false),
                    ProjectForWeeksId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HourPerWeek", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HourPerWeek_EmployeeForWeeks_EmployeeForWeeksId",
                        column: x => x.EmployeeForWeeksId,
                        principalTable: "EmployeeForWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_HourPerWeek_ProjectForWeeks_ProjectForWeeksId",
                        column: x => x.ProjectForWeeksId,
                        principalTable: "ProjectForWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeForWeeksId = table.Column<int>(nullable: true),
                    EmployeeId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    ProjectForWeeksId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Skills_EmployeeForWeeks_EmployeeForWeeksId",
                        column: x => x.EmployeeForWeeksId,
                        principalTable: "EmployeeForWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Skills_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Skills_ProjectForWeeks_ProjectForWeeksId",
                        column: x => x.ProjectForWeeksId,
                        principalTable: "ProjectForWeeks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Skills_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeForWeeks_EmployeeId",
                table: "EmployeeForWeeks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeForWeeks_ProjectId",
                table: "EmployeeForWeeks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_HourPerWeek_EmployeeForWeeksId",
                table: "HourPerWeek",
                column: "EmployeeForWeeksId");

            migrationBuilder.CreateIndex(
                name: "IX_HourPerWeek_ProjectForWeeksId",
                table: "HourPerWeek",
                column: "ProjectForWeeksId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectForWeeks_EmployeeId",
                table: "ProjectForWeeks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectForWeeks_ProjectId",
                table: "ProjectForWeeks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectLeaderId",
                table: "Projects",
                column: "ProjectLeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_EmployeeForWeeksId",
                table: "Skills",
                column: "EmployeeForWeeksId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_EmployeeId",
                table: "Skills",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_ProjectForWeeksId",
                table: "Skills",
                column: "ProjectForWeeksId");

            migrationBuilder.CreateIndex(
                name: "IX_Skills_ProjectId",
                table: "Skills",
                column: "ProjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HourPerWeek");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "EmployeeForWeeks");

            migrationBuilder.DropTable(
                name: "ProjectForWeeks");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
