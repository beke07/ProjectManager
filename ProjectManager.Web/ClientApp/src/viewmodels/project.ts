import { EmployeeForWeeks } from "./employeeforweeks";
import { Skill } from "./skill";
import { Employee } from "./employee";
import { SkillToProjectAndEmployee } from "./skillToProjectAndEmployee";

export class Project {
  id: number;
  name: string;
  projectLeader: Employee;
  company: string;
  risk: number;
  startDate: Date;
  dueDate: Date;
  numberOfWeeks: number;
  plannedHours: number;
  currentHours: number;
  skills: Skill[];
  projectSkills: SkillToProjectAndEmployee[];
  employeesForWeeks: EmployeeForWeeks[];
}
