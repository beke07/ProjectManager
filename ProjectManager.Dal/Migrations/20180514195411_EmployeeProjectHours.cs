using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ProjectManager.Dal.Migrations
{
    public partial class EmployeeProjectHours : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HourPerWeek_EmployeeForWeeks_EmployeeForWeeksId",
                table: "HourPerWeek");

            migrationBuilder.DropForeignKey(
                name: "FK_HourPerWeek_ProjectForWeeks_ProjectForWeeksId",
                table: "HourPerWeek");

            migrationBuilder.DropTable(
                name: "EmployeeForWeeks");

            migrationBuilder.DropTable(
                name: "ProjectForWeeks");

            migrationBuilder.DropIndex(
                name: "IX_HourPerWeek_EmployeeForWeeksId",
                table: "HourPerWeek");

            migrationBuilder.DropColumn(
                name: "EmployeeForWeeksId",
                table: "HourPerWeek");

            migrationBuilder.RenameColumn(
                name: "ProjectForWeeksId",
                table: "HourPerWeek",
                newName: "EmployeeProjectHourPerWeeksId");

            migrationBuilder.RenameIndex(
                name: "IX_HourPerWeek_ProjectForWeeksId",
                table: "HourPerWeek",
                newName: "IX_HourPerWeek_EmployeeProjectHourPerWeeksId");

            migrationBuilder.CreateTable(
                name: "EmployeeProjectHourPerWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeProjectHourPerWeeks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeProjectHourPerWeeks_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_EmployeeProjectHourPerWeeks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeProjectHourPerWeeks_EmployeeId",
                table: "EmployeeProjectHourPerWeeks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeProjectHourPerWeeks_ProjectId",
                table: "EmployeeProjectHourPerWeeks",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_HourPerWeek_EmployeeProjectHourPerWeeks_EmployeeProjectHourPerWeeksId",
                table: "HourPerWeek",
                column: "EmployeeProjectHourPerWeeksId",
                principalTable: "EmployeeProjectHourPerWeeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HourPerWeek_EmployeeProjectHourPerWeeks_EmployeeProjectHourPerWeeksId",
                table: "HourPerWeek");

            migrationBuilder.DropTable(
                name: "EmployeeProjectHourPerWeeks");

            migrationBuilder.RenameColumn(
                name: "EmployeeProjectHourPerWeeksId",
                table: "HourPerWeek",
                newName: "ProjectForWeeksId");

            migrationBuilder.RenameIndex(
                name: "IX_HourPerWeek_EmployeeProjectHourPerWeeksId",
                table: "HourPerWeek",
                newName: "IX_HourPerWeek_ProjectForWeeksId");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeForWeeksId",
                table: "HourPerWeek",
                nullable: true);

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

            migrationBuilder.CreateIndex(
                name: "IX_HourPerWeek_EmployeeForWeeksId",
                table: "HourPerWeek",
                column: "EmployeeForWeeksId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeForWeeks_EmployeeId",
                table: "EmployeeForWeeks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeForWeeks_ProjectId",
                table: "EmployeeForWeeks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectForWeeks_EmployeeId",
                table: "ProjectForWeeks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectForWeeks_ProjectId",
                table: "ProjectForWeeks",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_HourPerWeek_EmployeeForWeeks_EmployeeForWeeksId",
                table: "HourPerWeek",
                column: "EmployeeForWeeksId",
                principalTable: "EmployeeForWeeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HourPerWeek_ProjectForWeeks_ProjectForWeeksId",
                table: "HourPerWeek",
                column: "ProjectForWeeksId",
                principalTable: "ProjectForWeeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
