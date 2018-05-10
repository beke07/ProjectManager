import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { getBaseUrl } from "../main";
import { Employee } from "../viewmodels/employee";
import { ProjectServices } from "./projectservices";
import { SkillToProjectAndEmployee } from "../viewmodels/skillToProjectAndEmployee";

@Injectable()
export class EmployeeServices {
  public employees: Employee[];
  public employeesToSearch: Employee[];

  constructor(private http: HttpClient) {
    this.getEmployees().subscribe(result => {
      this.employees = result as Employee[];
      this.employeesToSearch = result as Employee[];
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(getBaseUrl() + 'api/Employee/GetEmployeeList');
  }

  createEmployee(employee: Employee): void {
    this.http.post<Employee>(getBaseUrl() + 'api/Employee/CreateNewEmployee', employee).subscribe(result => {
      this.employees.push(result);
      this.employeesToSearch.push(result);
    }, error => console.error(error));
  }

  editEmployee(employeeId: string, skills: number[]): void{
    let employee = <Employee>this.findEmployeeById(Number(employeeId));

    employee.employeeSkills = [];
    for (let i = 0; i < skills.length; i++) {
      let employeeSkill = new SkillToProjectAndEmployee();
      employeeSkill.skillId = skills[i];
      employee.employeeSkills.push(employeeSkill);
    }

    this.http.put<Employee>(getBaseUrl() + 'api/Employee/EditEmployee', employee).subscribe(result => {
      this.setEmployeeToAnother(result);
    }, error => console.error(error));
  }

  deleteEmployee(employeeid: string): Observable<Object>{
    let params = new HttpParams().set('employeeId', employeeid);
    return this.http.delete(getBaseUrl() + 'api/Employee/DeleteEmployee', { params: params });
  }

  findEmployeeById(employeeId: number): any {
    for (let i in this.employees) {
      if (this.employees[i].id === Number(employeeId)) {
        return this.employees[i];
      }
    }
  }

  setEmployeeToAnother(employee: Employee): void {
    for (let i in this.employees) {
      if (this.employees[i].id === Number(employee.id)) {
        this.employees[i].name = employee.name;
        this.employees[i].email = employee.email;
        this.employees[i].skills = employee.skills;
      }
    }
  }


}
