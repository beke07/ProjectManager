import { Skill } from "./skill";
import { ProjectForWeeks } from "./projectforweeks";

export class Employee {
  id: number;
  name: string;
  email: string;
  skills: Skill[];
  projectsForWeeks: ProjectForWeeks[];
}

Employee.prototype.toString = function employeeToString () {
  return this.name;
}
