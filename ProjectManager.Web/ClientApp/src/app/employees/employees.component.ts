import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../../services/employeeservices';
import { ProjectServices } from '../../services/projectservices';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { Employee } from '../../viewmodels/employee';
import { SkillServices } from '../../services/skillservices';
import { Skill } from '../../viewmodels/skill';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: [
    './employees.component.css',
  ]
})
export class EmployeesComponent implements OnInit {

  public popoverTitle: string = 'Are you sure?';
  public popoverMessage: string = 'Are you really sure you want to delete this employee?';

  addSkillsButton: HTMLButtonElement;
  public idOfElementToDelete: string;
  public employeeToEdit: Employee = new Employee();
  alerts: any[] = [];
  thereIsAnEdit: boolean[] = [];

  optionsModel: number[] = [];
  myOptions: IMultiSelectOption[] = [];
  notfound: boolean;

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true
  };

  skillsText: IMultiSelectTexts = {
    defaultTitle: 'Select skills',
    searchEmptyResult: ''
  };

  constructor(private employeeService: EmployeeServices, private projectService: ProjectServices, private skillService: SkillServices) {
    skillService.getSkills().subscribe(result => {
      this.myOptions = result as Skill[];
    });

    this.addSkillsButton = document.createElement("button");
    this.addSkillsButton.id = "add-skill-button";
    this.addSkillsButton.innerHTML = "Click to add this skill  ";
    this.addSkillsButton.type = "button";

    let component = this;
    this.addSkillsButton.addEventListener('click', function () {
      component.skillService.createNewSkill(this.name).subscribe(result => {

        skillService.getSkills().subscribe(result => {
          component.skillService.skills = result as Skill[];
        });

        component.optionsModel.push(result.id);
      })
    });

    this.addSkillsButton.classList.add("btn");
    this.addSkillsButton.classList.add("opened-button");

    this.addSkillsButton.setAttribute('style', 'width: 288px !important;');
    this.addSkillsButton.style.height = "34px";
    this.addSkillsButton.style.marginLeft = "5px";
    this.addSkillsButton.style.marginRight = "5px";
    this.addSkillsButton.style.borderRadius = "3px";

    let i = document.createElement("i");
    i.classList.add("glyphicon");
    i.classList.add("glyphicon-plus");

    this.addSkillsButton.appendChild(i);
  }

  search(event) {
    let text = (<HTMLInputElement>event.target).value;

    this.employeeService.employeesToSearch = [];
    for (let i = 0; i < this.employeeService.employees.length; i++) {
      let name = this.employeeService.employees[i].name;
      if (name.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
        this.employeeService.employeesToSearch.push(this.employeeService.employees[i]);
      }
    }
  }

  searchInput(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    let searchValue = (<HTMLInputElement>target).value
    let notFound = true;

    for (let i = 0; i < this.myOptions.length; i++) {
      let name = this.myOptions[i].name;
      if (name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
        notFound = false;
      }
    }

    let dropdownMenu = <HTMLElement>document.getElementsByClassName("dropdown-menu")[0];
    let empty = <HTMLElement>dropdownMenu.getElementsByClassName("empty")[0];
    
    if (notFound) {
      dropdownMenu.insertBefore(this.addSkillsButton, empty);

      this.addSkillsButton.name = searchValue;

      if (empty.style.display != "none") {
        empty.style.display = "none";
      }
    }
    else {
      let addButton = <HTMLButtonElement>dropdownMenu.querySelector("#add-skill-button");
      if (addButton) {
        dropdownMenu.removeChild(this.addSkillsButton);
      }
    }
  }

  add(projectLeaderId): void {

    let projectName = this.projectService.findProjectByProjectLeader(projectLeaderId);

    this.alerts.push({
      type: 'md-color',
      msg: "Warning! This employee is the leader of the project " + "'" + projectName + "'." + " Change the leader of the project first!",
      dismissible: true
    });
  }

  openCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    if (target.classList.contains("closed-button")) {

      this.optionsModel = [];
      let employeeId = (<HTMLElement>target).parentElement.id;
      this.skillService.getSkillsForEmployee(employeeId).subscribe(result => {
        for (let i = 0; i < result.length; i++) {
          this.optionsModel.push(result[i].id);
        }
      });

      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {
      target.classList.remove("opened-button");
      target.classList.add("closed-button");
    }

    this.closeTheOthers(target);
  }

  editCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    this.setEditability(target, Editability.On);

    let editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-button")[0];
    if (editCollapseButton.attributes['aria-expanded'].value === 'false') {
      editCollapseButton.click();
    }
  }

  saveChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    let employeeId = target.parentElement.id;

    let editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-button")[0];
    if (editCollapseButton.attributes['aria-expanded'].value === 'true') {
      editCollapseButton.click();
    }

    this.employeeService.editEmployee(employeeId, this.optionsModel);
    this.setEditability(target, Editability.Off);
  }

  setProjectToEdit(event: any) {
    var target = event.currentTarget;
    if (Number(this.employeeToEdit.id) != target.id) {
      this.employeeToEdit = Object.assign({}, this.employeeService.findEmployeeById(target.id));
    }
  }

  discardChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.employeeService.setEmployeeToAnother(this.employeeToEdit);

    let editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-button")[0];
    if (editCollapseButton.attributes['aria-expanded'].value === 'true') {
      editCollapseButton.click();
    }

    this.setEditability(target, Editability.Off);
  }

  setEditability(target: any, OfforOn: Editability) {
    let inputFields = document.getElementById("Collapse" + target.parentElement.id).querySelectorAll("h4[name=input-field]");
    for (var i = 0; i < inputFields.length; i++) {
      if (OfforOn === Editability.On) {
        inputFields[i].setAttribute("contenteditable", "true");
      }
      else if (OfforOn === Editability.Off) {
        inputFields[i].setAttribute("contenteditable", "false");
      }
    }

    let employeeWrapper = <HTMLElement>document.getElementById("employee-wrapper");
    if (OfforOn === Editability.On) {
      this.thereIsAnEdit.push(true);
      employeeWrapper.style.background = "linear-gradient(to right, rgba(238, 238, 238, 0.9), rgba(238, 238, 238, 0.5))";
    }
    else if (OfforOn === Editability.Off) {
      this.thereIsAnEdit.pop();
      if (this.thereIsAnEdit.length === 0) {
        employeeWrapper.style.background = "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5))";
      }
    }

    let cardBody = <HTMLElement>document.getElementById("Collapse" + target.parentElement.id).querySelector(".card-body");
    if (OfforOn === Editability.On) {
      cardBody.classList.remove("card-body-grey");
      cardBody.classList.add("white-card-design");
    }
    else if (OfforOn === Editability.Off) {
      cardBody.classList.remove("white-card-design");
      cardBody.classList.add("card-body-grey");
    }

    let editButton = <HTMLElement>target.parentElement.querySelector("#edit-button");
    let okButton = <HTMLElement>target.parentElement.querySelector("#ok-button");
    let cancelButton = <HTMLElement>target.parentElement.querySelector("#cancel-button");

    if (OfforOn === Editability.On) {
      okButton.classList.remove("not-visible");
      okButton.classList.add("visible");

      cancelButton.classList.remove("not-visible");
      cancelButton.classList.add("visible");

      editButton.classList.remove("visible");
      editButton.classList.add("not-visible");
    }
    else if (OfforOn === Editability.Off) {
      okButton.classList.remove("visible");
      okButton.classList.add("not-visible");

      cancelButton.classList.remove("visible");
      cancelButton.classList.add("not-visible");

      editButton.classList.remove("not-visible");
      editButton.classList.add("visible");
    }

    let card = this.findParentByTarget(target, "accordion");
    let skillNoAdded = <HTMLElement>card.querySelector("#skills-no-added");
    let skills = <NodeListOf<HTMLElement>>card.querySelectorAll("#skill-list");
    let editSkills = <HTMLElement>card.querySelector("#edit-skills");

    if (OfforOn === Editability.On) {
      if (skillNoAdded !== null) {
        skillNoAdded.classList.add("not-visible");
        skillNoAdded.classList.remove("visible");
      }

      for (let i = 0; i < skills.length; i++) {
        skills[i].classList.add("not-visible");
        skills[i].classList.remove("visible");
      }

      editSkills.classList.add("visible");
      editSkills.classList.remove("not-visible");
    }
    else if (OfforOn === Editability.Off) {
      if (skillNoAdded !== null) {
        skillNoAdded.classList.add("visible");
        skillNoAdded.classList.remove("not-visible");
      }

      for (let i = 0; i < skills.length; i++) {
        skills[i].classList.remove("not-visible");
        skills[i].classList.add("visible");;
      }

      editSkills.classList.add("not-visible");
      editSkills.classList.remove("visible");
    }
  }

  closeTheOthers(target) {

    let projectWrapper: HTMLElement = this.findParentByTarget(target, "employee-wrapper");
    let collapseButtons = <NodeListOf<HTMLElement>>projectWrapper.querySelectorAll("#collapse-button");
    let editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-button")[0];
    let nameofeditCollapseButton = editCollapseButton.getAttribute("name");
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

  setElementToDelete(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.idOfElementToDelete = event.target.id;
  }

  deleteCard() {

    for (let i = 0; i < this.employeeService.employeesToSearch.length; i++) {
      if (this.employeeService.employeesToSearch[i].id == Number(this.idOfElementToDelete)) {
        this.employeeService.employeesToSearch.splice(i, 1);
      }
    }

    this.employeeService.deleteEmployee(this.idOfElementToDelete).subscribe(result => {
      let isDeleteSuccesful = <boolean>result;
      if (isDeleteSuccesful) {
        this.employeeService.getEmployees().subscribe(result => {
          this.employeeService.employees = result as Employee[];
        });
      }
      else if (!isDeleteSuccesful) {
          if (this.alerts.length == 0) {
            this.add(this.idOfElementToDelete);
          }
      }
    })
  }

  closeAlert() {
    this.alerts = [];
  }

  ngOnInit() {
  }
}

enum Editability {
  On,
  Off
}


