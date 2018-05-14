using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ProjectManager.Dal.Migrations
{
    public partial class EmlpoyeeForWeeksBack : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "NumberOfWeeks",
                table: "Projects",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "HoursPerWeek",
                table: "Employees",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "OtherThingsToDoForWeeks",
                table: "Employees",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursPerWeek",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "OtherThingsToDoForWeeks",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "NumberOfWeeks",
                table: "Projects",
                nullable: false,
                oldClrType: typeof(double));
        }
    }
}
