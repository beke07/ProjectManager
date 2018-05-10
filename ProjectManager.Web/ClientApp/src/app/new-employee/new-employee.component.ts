import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Employee } from '../../viewmodels/employee';
import { IMultiSelectSettings, IMultiSelectOption, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { SkillServices } from '../../services/skillservices';
import { Skill } from '../../viewmodels/skill';
import { SkillToProjectAndEmployee } from '../../viewmodels/skillToProjectAndEmployee';
import { EmployeeServices } from '../../services/employeeservices';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { add } from 'ngx-bootstrap/chronos/moment/add-subtract';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: [
    './new-employee.component.css',
    '../projects/projects.component.css',
    '../new-project/new-project.component.css'
  ]
})
export class NewEmployeeComponent implements OnInit {

  public bottomBorderRadius = "3px";
  public model = new Employee();
  optionsModel: number[];
  myOptions: IMultiSelectOption[] = [];
  observer: MutationObserver;

  notfound: boolean;
  addSkillsButton: HTMLButtonElement;

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    dynamicTitleMaxItems: 1,
    stopScrollPropagation: true,
    displayAllSelectedText: true
  };

  skillsText: IMultiSelectTexts = {
    defaultTitle: 'Select skills',
    searchEmptyResult: ''
  };

  constructor(private skillService: SkillServices, private employeeService: EmployeeServices) {
    skillService.getSkills().subscribe(result => {
      this.myOptions = result as Skill[];
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

  ngOnInit() {
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

  onSubmit() {
    this.model.employeeSkills = [];
    for (let i = 0; i < this.optionsModel.length; i++) {
      let employeeSkill = new SkillToProjectAndEmployee();
      employeeSkill.skillId = this.optionsModel[i];
      this.model.employeeSkills.push(employeeSkill);
    }

    this.employeeService.createEmployee(this.model);
  }


}
