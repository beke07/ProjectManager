import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Project } from '../../viewmodels/project';
import { ProjectServices } from '../../services/projectservices';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { SkillServices } from '../../services/skillservices';
import { Skill } from '../../viewmodels/skill';
import { SkillToProjectAndEmployee } from '../../viewmodels/skillToProjectAndEmployee';
import { EmployeeServices } from '../../services/employeeservices';
import { Employee } from '../../viewmodels/employee';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [
    './new-project.component.css',
    '../projects/projects.component.css'
  ]
})
export class NewProjectComponent {

  datePickerConfig: Partial<BsDatepickerConfig>;
  minDate: Date;
  maxDate: Date;

  public model = new Project();
  public bottomBorderRadius = "3px";

  notfound: boolean;
  addSkillsButton: HTMLButtonElement;

  optionsModel: number[];
  projectLeader: number[];

  myOptions: IMultiSelectOption[] = [];
  projectLeaderOptions: IMultiSelectOption[] = [];

  projectLeadersettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    dynamicTitleMaxItems: 1,
    selectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true,
    displayAllSelectedText: true
  };

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true
  };

  projectLeaderText: IMultiSelectTexts = {
    defaultTitle: 'Select project leader',
  };

  skillsText: IMultiSelectTexts = {
    defaultTitle: 'Select skills',
    searchEmptyResult: ''
  };

  constructor(private projectService: ProjectServices, private skillService: SkillServices, private employeeService: EmployeeServices) {
    this.datePickerConfig = (<any>Object).assign({}, {
      dateInputFormat: 'YYYY-MM-DD'
    });

    skillService.getSkills().subscribe(result => {
      this.myOptions = result as Skill[];
    });

    employeeService.getEmployees().subscribe(result => {
      this.projectLeaderOptions = result as Employee[];
    });

    this.optionsModel = [];

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

  onChange() {

  }

  openCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    if (target.classList.contains("closed-button")) {
      this.bottomBorderRadius = "0";
      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {
      this.bottomBorderRadius = "3px";
      target.classList.remove("opened-button");
      target.classList.add("closed-button");
    }
  }

  onMinValueChange(value: Date) {
    this.minDate = value;
  }

  onMaxValueChange(value: Date) {
    this.maxDate = value;
  }

  onSubmit() {
    this.model.projectSkills = [];
    for (let i = 0; i < this.optionsModel.length; i++) {
      let projectSkill = new SkillToProjectAndEmployee();
      projectSkill.skillId = this.optionsModel[i];
      this.model.projectSkills.push(projectSkill);
    }

    let projectLeaderEmployee = new Employee();
    projectLeaderEmployee.id = this.projectLeader[0];
    this.model.projectLeader = projectLeaderEmployee;

    this.projectService.createNewProject(this.model);
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
