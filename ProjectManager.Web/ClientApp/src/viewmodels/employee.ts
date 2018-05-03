import { Skill } from "./skill";
import { ProjectForWeeks } from "./projectforweeks";

export class Employee {
  Id: number;
  Name: string;
  Email: string;
  Skills: Skill[];
  ProjectsForWeeks: ProjectForWeeks[];
}
