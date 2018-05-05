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

  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
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
  }

  onChange() {
    console.log(this.projectLeader);
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
