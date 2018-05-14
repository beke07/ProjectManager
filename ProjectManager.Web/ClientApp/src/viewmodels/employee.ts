import { Skill } from "./skill";
import { SkillToProjectAndEmployee } from "./skillToProjectAndEmployee";
import { EmployeeProjectHourPerWeeks } from "./employeeProjectHourPerWeeks";

export class Employee {
  id: number;
  name: string;
  email: string;
  skills: Skill[];
  otherThingsToDoForWeeks: number;
  hoursPerWeek: number;
  employeeSkills: SkillToProjectAndEmployee[];
  employeeProjectHourPerWeeks: EmployeeProjectHourPerWeeks[];
}

Employee.prototype.toString = function employeeToString () {
  return this.name;
}
