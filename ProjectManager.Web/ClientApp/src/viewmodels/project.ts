import { EmployeeForWeeks } from "./employeeforweeks";
import { Skill } from "./skill";
import { Employee } from "./employee";

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
  employeesForWeeks: EmployeeForWeeks[];
}
