import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Project } from "../viewmodels/project";
import { catchError } from "rxjs/operators";
import { getBaseUrl } from "../main";
import { Skill } from "../viewmodels/skill";
import { SkillToProjectAndEmployee } from "../viewmodels/skillToProjectAndEmployee";
import { Employee } from "../viewmodels/employee";
import { EmployeeServices } from "./employeeservices";
import { HourPerWeek } from "../viewmodels/hourPerWeek";
import { ProjectIDEmployee } from "../viewmodels/projectIDEmployee";
import { EmployeeProjectHourPerWeeks } from "../viewmodels/employeeProjectHourPerWeeks";

@Injectable()
export class ProjectServices {

  public projects: Project[];
  public projectsToSearch: Project[];

  constructor(private http: HttpClient, private employeeService: EmployeeServices) {
    this.getProjects().subscribe(result => {
      this.projects = result as Project[];
      this.projectsToSearch = result as Project[];
    });
  }

  addEmployeeToProject(employeeid, projectid) {

    let projectIDEmployee = new ProjectIDEmployee();
    projectIDEmployee.employeeId = employeeid;
    projectIDEmployee.projectId = projectid;

    this.http.put<ProjectIDEmployee>(getBaseUrl() + 'api/Project/AddEmployeeToProject', projectIDEmployee).subscribe(result => {
      console.log(result as ProjectIDEmployee);
    });
  }

  getEmployeesForWeeks(projectId): void {
    let params = new HttpParams().set('projectId', projectId);
    this.http.get<EmployeeProjectHourPerWeeks[]>(getBaseUrl() + 'api/Project/GetEmployeesForWeeks', { params: params }).subscribe(result => {
      console.log(result as EmployeeProjectHourPerWeeks[]);
    });
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(getBaseUrl() + 'api/Project/GetProjectList');
  }

  createNewProject(project: Project): void {
    this.http.post<Project>(getBaseUrl() + 'api/Project/CreateNewProject', project).subscribe(result => {
      this.projectsToSearch.push(result as Project);
    }, error => console.error(error));
  }

  deleteProject(projectId: string): void {
    let params = new HttpParams().set('projectId', projectId);
    this.http.delete(getBaseUrl() + 'api/Project/DeleteProject', { params: params }).subscribe(result => {
      this.projects = result as Project[];
    }, error => console.error(error));
  }

  editProject(projectId: string, skills: number[], projectLeader: number[]): void {
    let project = <Project>this.findProjectById(projectId);

    project.projectSkills = [];
    for (let i = 0; i < skills.length; i++) {
      let projectSkill = new SkillToProjectAndEmployee();
      projectSkill.skillId = skills[i];
      project.projectSkills.push(projectSkill);
    }

    project.projectLeader = this.employeeService.findEmployeeById(projectLeader[0]);

    this.http.put<Project>(getBaseUrl() + 'api/Project/EditProject', project).subscribe(result => {
      this.setProjectToAnother(result);
    }, error => console.error(error));
  }

  GetEmployeesHoursPerWeek(employeeid, projectid): Observable<HourPerWeek[]>{
    let params = new HttpParams().set('employeeId', employeeid).set('projectId', projectid);
    return this.http.get<HourPerWeek[]>(getBaseUrl() + 'api/Project/GetEmployeesHoursPerWeek', { params: params });
  }

  findProjectById(projectId: string): any{
    for (let i in this.projects) {
      if (this.projects[i].id === Number(projectId)) {
        return this.projects[i];
      }
    }
  }

  findProjectByProjectLeader(projectLeaderid: number): string {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].projectLeader.id == projectLeaderid) {
        return this.projects[i].name;
      }
    }
  }

  setProjectToAnother(project: Project): void {
    for (let i in this.projects) {
      if (this.projects[i].id === Number(project.id)) {
        this.projects[i].name = project.name;
        this.projects[i].company = project.company;
        this.projects[i].currentHours = project.currentHours;
        this.projects[i].dueDate = project.dueDate;
        this.projects[i].employeeProjectHourPerWeeks = project.employeeProjectHourPerWeeks;
        this.projects[i].numberOfWeeks = project.numberOfWeeks;
        this.projects[i].plannedHours = project.plannedHours;
        this.projects[i].projectLeader = project.projectLeader;
        this.projects[i].projectSkills = project.projectSkills;
        this.projects[i].skills = project.skills;
        this.projects[i].risk = project.risk;
        this.projects[i].startDate = project.startDate;
      }
    }
  }
}
