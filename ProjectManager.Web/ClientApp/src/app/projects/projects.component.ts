import { Component, OnInit, Renderer, Directive, QueryList, Input, Injectable, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectServices } from '../../services/projectservices';
import { Project } from '../../viewmodels/project';
import { Element } from '@angular/compiler';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { SkillServices } from '../../services/skillservices';
import { Skill } from '../../viewmodels/skill';
import { EmployeeServices } from '../../services/employeeservices';
import { Employee } from '../../viewmodels/employee';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit, AfterViewInit {

  public popoverTitle: string = 'Are you sure?';
  public popoverMessage: string = 'Are you really sure you want to delete this project?';
  public idOfElementToDelete: string;
  public projectToEdit: Project = new Project();

  optionsModel: number[] = [];
  projectLeader: number[] = [];

  myOptions: IMultiSelectOption[] = [];
  projectLeaderOptions: IMultiSelectOption[] = [];

  thereIsAnEdit: boolean[] = [];

  notfound: boolean;
  addSkillsButton: HTMLButtonElement;

  projectLeadersettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    dynamicTitleMaxItems: 1,
    selectionLimit: 1,
    closeOnSelect: true,
    autoUnselect: true,
    displayAllSelectedText: true
  };

  skillsText: IMultiSelectTexts = {
    defaultTitle: 'Select skills',
    searchEmptyResult: ''
  };

  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'glyphicon',
    dynamicTitleMaxItems: 1,
    stopScrollPropagation: true,
    displayAllSelectedText: true
  };

  constructor(private renderer: Renderer, private projectService: ProjectServices, private skillService: SkillServices, private employeeService: EmployeeServices) {
    skillService.getSkills().subscribe(result => {
      this.myOptions = result as Skill[];
    });

    employeeService.getEmployees().subscribe(result => {
      this.projectLeaderOptions = result as Employee[];
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

    this.projectService.projectsToSearch = [];
    for (let i = 0; i < this.projectService.projects.length; i++) {
      let name = this.projectService.projects[i].name;
      if (name.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
        this.projectService.projectsToSearch.push(this.projectService.projects[i]);
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

  openCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    if (target.classList.contains("closed-button")) {

      this.optionsModel = [];
      let projectId = (<HTMLElement>target).parentElement.id;
      this.skillService.getSkillsForProject(projectId).subscribe(result => {
        for (let i = 0; i < result.length; i++) {
          this.optionsModel.push(result[i].id);
        }
      });

      this.projectLeader = [];
      let project = <Project>this.projectService.findProjectById(projectId);
      this.projectLeader.push(project.projectLeader.id);

      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {
      target.classList.remove("opened-button");
      target.classList.add("closed-button");
    }

    this.closeTheOthers(target);
  }

  setElementToDelete(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.idOfElementToDelete = event.target.id;
  }

  deleteCard() {

    for (let i = 0; i < this.projectService.projectsToSearch.length; i++) {
      if (this.projectService.projectsToSearch[i].id == Number(this.idOfElementToDelete)) {
        this.projectService.projectsToSearch.splice(i, 1);
      }
    }

    this.projectService.deleteProject(this.idOfElementToDelete);
  }

  setProjectToEdit(event: any) {
    var target = event.currentTarget;
    if (Number(this.projectToEdit.id) != target.id) {
      this.projectToEdit = Object.assign({}, this.projectService.findProjectById(target.id));
    }
  }

  closeTheOthers(target) {

    let projectWrapper: HTMLElement = this.findParentByTarget(target, "project-wrapper");
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
    let projectId = target.parentElement.id;

    let editCollapseButton = <HTMLElement>target.parentElement.querySelectorAll("#collapse-button")[0];
    if (editCollapseButton.attributes['aria-expanded'].value === 'true') {
      editCollapseButton.click();
    }

    this.projectService.editProject(projectId, this.optionsModel, this.projectLeader);
    this.setEditability(target, Editability.Off);
  }

  discardChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.projectService.setProjectToAnother(this.projectToEdit);

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

    let projectWrapper = <HTMLElement>document.getElementById("project-wrapper");
    if (OfforOn === Editability.On) {
      this.thereIsAnEdit.push(true);
      projectWrapper.style.background = "linear-gradient(to right, rgba(238, 238, 238, 0.9), rgba(238, 238, 238, 0.5))";
    }
    else if (OfforOn === Editability.Off) {
      this.thereIsAnEdit.pop();
      if(this.thereIsAnEdit.length === 0){
        projectWrapper.style.background = "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5))";
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

    let projectLeader = <HTMLElement>card.querySelector("#project-leader");
    let projectLeaderOptions = <HTMLElement>card.querySelector("#project-leader-options");

    if (OfforOn === Editability.On) {
      if (skillNoAdded !== null) {
        skillNoAdded.classList.add("not-visible");
        skillNoAdded.classList.remove("visible");
      }

      for (let i = 0; i < skills.length; i++) {
          skills[i].classList.add("not-visible");
          skills[i].classList.remove("visible");
      }

      projectLeader.classList.add("not-visible");
      projectLeader.classList.remove("visible");

      projectLeaderOptions.classList.add("visible");
      projectLeaderOptions.classList.remove("not-visible");

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

      projectLeader.classList.remove("not-visible");
      projectLeader.classList.add("visible");

      projectLeaderOptions.classList.remove("visible");
      projectLeaderOptions.classList.add("not-visible");

      editSkills.classList.add("not-visible");
      editSkills.classList.remove("visible");
    }
  }

  findParentByTarget(target, id): HTMLElement {
    let parent: HTMLElement = (<HTMLElement>target).parentElement;
    while (parent.id != id) {
      parent = parent.parentElement;
    }
    return parent;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }
}

enum Editability {
  On,
  Off
}
