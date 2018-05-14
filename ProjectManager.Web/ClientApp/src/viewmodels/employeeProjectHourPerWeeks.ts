import { Project } from "./project";
import { Employee } from "./employee";
import { HourPerWeek } from "./hourPerWeek";

export class EmployeeProjectHourPerWeeks {
  project: Project;
  employee: Employee;
  hoursPerWeeks: HourPerWeek[];
}
