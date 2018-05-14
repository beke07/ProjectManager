import { Skill } from "./skill";
import { Employee } from "./employee";
import { SkillToProjectAndEmployee } from "./skillToProjectAndEmployee";
import { EmployeeProjectHourPerWeeks } from "./employeeProjectHourPerWeeks";

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
  weeks: string[];
  projectSkills: SkillToProjectAndEmployee[];
  employeeProjectHourPerWeeks: EmployeeProjectHourPerWeeks[];
}
