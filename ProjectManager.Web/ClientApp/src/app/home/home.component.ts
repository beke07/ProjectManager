import { Component } from '@angular/core';
import { Employee } from '../../viewmodels/employee';
import { Project } from '../../viewmodels/project';
import { EmployeeServices } from '../../services/employeeservices';
import { ProjectServices } from '../../services/projectservices';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    '../projects/projects.component.css',
    '../employees/employees.component.css'
  ]
})
export class HomeComponent {

  options: any = {
    revertOnSpill: true,
    copy: true,
    accepts: function (el, source, handle, sibling) {
      return source.classList.contains("not-draggable");
    },
    moves: function (el, source, handle, sibling) {
      if (source.classList.contains("not-draggable")) {
        return false;
      }
      else {
        return true;
      }
    }
  }

  initialized: boolean = false;
  employeesForWork: Employee[];
  actualProject: Project;

  constructor(private employeeService: EmployeeServices, private projectService: ProjectServices, private dragulaService: DragulaService) {
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  private onOut(args) {
    let [el, target, source] = args;

    let targetParent = (<HTMLElement>target).parentElement;
    let sourceParent = (<HTMLElement>source).parentElement;

    if (targetParent.id != sourceParent.id) {
      let element = <HTMLElement>el;
      let targetElement = <HTMLElement>target;
      element.style.display = "none";
      targetElement.style.border = "1px solid dimgray";
    }
  }

  private onOver(args) {
    let [el, target, source] = args;

    let targetParent = (<HTMLElement>target).parentElement;
    let sourceParent = (<HTMLElement>source).parentElement;

    if (targetParent.id != sourceParent.id) {
      let element = <HTMLElement>el;
      let targetElement = <HTMLElement>target;
      element.style.display = "none";
      targetElement.style.border = "2px solid dimgray";
    }
  }

  private onDrop(args) {
    let [el, target, source] = args;

    let targetParent = (<HTMLElement>target).parentElement;
    let sourceParent = (<HTMLElement>source).parentElement;

    if (targetParent.id != sourceParent.id) {
      let element = <HTMLElement>el;
      let targetElement = <HTMLElement>target;
      element.style.display = "none";
      targetElement.style.backgroundColor = "green";
    }
    else {
      return false;
    }
  }

  openEmployeeCard(event: any) {
    var target = <HTMLElement>event.target;

    if (target.classList.contains("closed-button")) {

      let employeeId = target.getAttribute("name");
      let employee = this.employeeService.findEmployeeById(Number(employeeId)) as Employee;

      //this.employeeService.projectsInThisTime(employee.id, this.actualProject.id);

      //for (let i = 0; i < this.actualProject.numberOfWeeks; i++) {
      //  let week;
      //  week = employee.hoursPerWeek - employee.otherThingsToDoForWeeks;
      //}

      //console.log(this.actualProject);
      //console.log(employee);

      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {
      target.classList.remove("opened-button");
      target.classList.add("closed-button");
    }

    this.closeTheOthers(target, "employees");
  }

  openCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    if (!this.initialized) {
      let tables = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("weekTable");
      let tbodies = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("tbodies");

      for (let i = 0; i < this.projectService.projects.length; i++) {
        this.projectService.projects[i].weeks = [];
        for (let j = 0; j < this.projectService.projects[i].numberOfWeeks; j++) {
          this.projectService.projects[i].weeks.push((j + 1) + ".week");
        }
        tables[i].style.width = ((this.projectService.projects[i].numberOfWeeks + 1) * 75) + "px";
      }

      this.initialized = true;
    }

    if (target.classList.contains("closed-button")) {

      let projectId = (<HTMLButtonElement>target).getAttribute("name");
      this.searchForEmployees(projectId);

      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {
      target.classList.remove("opened-button");
      target.classList.add("closed-button");
    }

    this.closeTheOthers(target, "projects");
  }

  searchForEmployees(projectId) {
    this.employeesForWork = [];
    let project = <Project>this.projectService.findProjectById(projectId);
    this.actualProject = project;
    let inIt: boolean;

    for (let i = 0; i < this.employeeService.employees.length; i++) {
      inIt = false;
      for (let j = 0; j < this.employeeService.employees[i].skills.length; j++) {
        for (let k = 0; k < project.skills.length; k++) {
          if (this.employeeService.employees[i].skills[j].id == project.skills[k].id) {
            inIt = true;
          }
        }
      }

      if (inIt) {
        this.employeesForWork.push(this.employeeService.employees[i]);
      }
    }

  }

  closeTheOthers(target, type) {

    let projectWrapper;
    let editCollapseButton;
    let nameofeditCollapseButton;
    let collapseButtons;

    if (type == "projects") {
      projectWrapper = <HTMLElement>this.findParentByTarget(target, "project-wrapper");
      editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-button")[0];
      nameofeditCollapseButton = editCollapseButton.getAttribute("name");
      collapseButtons = <NodeListOf<HTMLElement>>projectWrapper.querySelectorAll("#collapse-button");
    }
    else if (type == "employees") {
      projectWrapper = <HTMLElement>this.findParentByTarget(target, "employee-wrapper");
      editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-employee-button")[0];
      nameofeditCollapseButton = editCollapseButton.getAttribute("name");
      collapseButtons = <NodeListOf<HTMLElement>>projectWrapper.querySelectorAll("#collapse-employee-button");
    }

    let clicked = false;

    for (let i = 0; i < collapseButtons.length; i++) {
      if (collapseButtons[i].getAttribute("name") !== nameofeditCollapseButton) {
        if (collapseButtons[i].attributes['aria-expanded'].value === 'true') {
          collapseButtons[i].click();
        }
      }
    }
  }

  findParentByTarget(target, id): HTMLElement {
    let parent: HTMLElement = (<HTMLElement>target).parentElement;
    while (parent.id != id) {
      parent = parent.parentElement;
    }
    return parent;
  }
}
