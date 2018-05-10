import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AlertModule  } from 'ngx-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectServices } from '../services/projectservices';
import { SkillServices } from '../services/skillservices';
import { EmployeeServices } from '../services/employeeservices';
import { NewProjectComponent } from './new-project/new-project.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EmployeesComponent } from './employees/employees.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { SkillsComponent } from './skills/skills.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProjectsComponent,
    NewProjectComponent,
    EmployeesComponent,
    NewEmployeeComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MultiselectDropdownModule,
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'success',
      cancelButtonType: 'danger',
      cancelText: 'No <i class="glyphicon glyphicon-remove"></i>',
      confirmText: 'Yes <i class="glyphicon glyphicon-ok"></i>'
    }),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'skills', component: SkillsComponent },
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [
    ProjectServices,
    EmployeeServices,
    SkillServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
