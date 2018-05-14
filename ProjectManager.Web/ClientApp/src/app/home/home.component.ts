import { Component } from '@angular/core';
import { Employee } from '../../viewmodels/employee';
import { Project } from '../../viewmodels/project';
import { EmployeeServices } from '../../services/employeeservices';
import { ProjectServices } from '../../services/projectservices';
import { DragulaService } from 'ng2-dragula';
import { HourPerWeek } from '../../viewmodels/hourPerWeek';

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

    let targetElement = <HTMLElement>target;
    let targetParent = (<HTMLElement>target).parentElement;
    let sourceParent = (<HTMLElement>source).parentElement;

    if (targetParent.id != sourceParent.id) {
      let element = <HTMLElement>el;
      let targetElement = <HTMLElement>target;
      element.style.display = "none";
      targetElement.style.backgroundColor = "green";

      let employeeId = (<HTMLElement>el).firstElementChild.id;
      let projectId = targetElement.id;

      this.projectService.addEmployeeToProject(employeeId, projectId);
    }
    else {
      return false;
    }
  }

  clearCard(table) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    tr.appendChild(td);
    thead.appendChild(tr);
    table.appendChild(thead);

    let newtbody = document.createElement("tbody");
    table.appendChild(newtbody);
  }

  openEmployeeCard(event: any) {
    var target = <HTMLElement>event.target;

    let employeeId = target.getAttribute("name");
    let employee = this.employeeService.findEmployeeById(Number(employeeId)) as Employee;

    let table = <HTMLTableElement>document.getElementById("table" + employeeId);
    let theadTr = <HTMLTableRowElement>table.getElementsByTagName("thead")[0].firstElementChild;
    let tbody = <HTMLTableSectionElement>table.getElementsByTagName("tbody")[0];
    let td = document.createElement("td");
        td.style.border = "1px solid dimgray";
        td.style.textAlign = "center"
        td.style.width = "40px";
        td.style.height = "40px";

    if (target.classList.contains("closed-button")) {

      this.projectService.GetEmployeesHoursPerWeek(employee.id, this.actualProject.id).subscribe(result => {

        console.log(result);

        for (let i = 0; i < result.length; i++) {
          let headtd = <HTMLTableCellElement>td.cloneNode(true);
          headtd.innerHTML = ((i + 1) + ".");
          theadTr.appendChild(headtd);

          if (i == 0) {
            for (let j = 0; j < 10; j++) {
              let tr = document.createElement("tr");
              let bodyfirsttd = <HTMLTableCellElement>td.cloneNode(true);
              bodyfirsttd.innerHTML = ((j + 1) * 10 + "%");
              tr.appendChild(bodyfirsttd);
              tbody.appendChild(tr);
            }
          }

          let hourInThisWeekInPercent = (result[i].hour / employee.hoursPerWeek) * 10;
          let hourInThisWeekInPercentFloor = Math.floor(hourInThisWeekInPercent);
          let theRest = hourInThisWeekInPercent - hourInThisWeekInPercentFloor;
          let bodyTrs = <NodeListOf<HTMLTableRowElement>>tbody.getElementsByTagName("tr");

          for (let j = 0; j < hourInThisWeekInPercentFloor; j++) {
              let bodytd = <HTMLTableCellElement>td.cloneNode(true);
              bodytd.style.backgroundColor = "green";

              if (theRest == 0 && j == hourInThisWeekInPercentFloor - 1) {
                bodytd.innerHTML = String(result[i].hour);
              }

              bodyTrs[j].appendChild(bodytd);
              
          }

          if (theRest != 0) {
            let percentTd = <HTMLTableCellElement>bodyTrs[hourInThisWeekInPercentFloor].firstElementChild;
            percentTd.style.height = (40 * (1 - theRest)) + "px";
            percentTd.innerHTML = (hourInThisWeekInPercent * 10) + "%";

            let restTd = <HTMLTableCellElement>td.cloneNode(true);
            restTd.style.backgroundColor = "green";
            restTd.style.height = (40 * (theRest)) + "px";
            restTd.innerHTML = String(result[i].hour);
            bodyTrs[hourInThisWeekInPercentFloor].appendChild(restTd);
          }
        }
        table.style.width = (result.length * 40) + "px";
      });

      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {

      this.clearCard(table);

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

      this.projectService.getEmployeesForWeeks(projectId);

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
