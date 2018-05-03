import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectServices } from '../services/projectservices';
import { EmployeeServices } from '../services/employeeservices';
import { NewProjectComponent } from './new-project/new-project.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    ProjectsComponent,
    NewProjectComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
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
      { path: '', component: HomeComponent }
    ])
  ],
  providers: [
    ProjectServices,
    EmployeeServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
