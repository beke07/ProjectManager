import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { getBaseUrl } from "../main";
import { Employee } from "../viewmodels/employee";

@Injectable()
export class EmployeeServices {

  public employees: Employee[];

  constructor(private http: HttpClient) {
    this.getEmployees().subscribe(result => this.employees = result as Employee[]);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(getBaseUrl() + 'api/Employee/GetEmployeeList');
  }
}
