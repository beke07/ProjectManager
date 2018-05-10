import { Skill } from "./skill";
import { ProjectForWeeks } from "./projectforweeks";
import { SkillToProjectAndEmployee } from "./skillToProjectAndEmployee";

export class Employee {
  id: number;
  name: string;
  email: string;
  skills: Skill[];
  employeeSkills: SkillToProjectAndEmployee[];
  projectsForWeeks: ProjectForWeeks[];
}

Employee.prototype.toString = function employeeToString () {
  return this.name;
}
