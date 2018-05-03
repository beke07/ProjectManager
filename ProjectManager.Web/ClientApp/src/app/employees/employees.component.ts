import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../../services/employeeservices';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public popoverTitle: string = 'Are you sure?';
  public popoverMessage: string = 'Are you really sure you want to delete this project?';

  constructor(private employeeService: EmployeeServices) { }

  ngOnInit() {
  }

}
