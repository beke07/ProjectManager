import { Component, OnInit, Renderer, Directive, QueryList, Input, Injectable, Inject, ChangeDetectionStrategy } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectServices } from '../../services/projectservices';
import { Project } from '../../viewmodels/project';
import { Element } from '@angular/compiler';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

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

  constructor(private renderer: Renderer, private projectService: ProjectServices) {
  }

  openCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    if (target.classList.contains("closed-button")) {
      target.classList.remove("closed-button");
      target.classList.add("opened-button");
    }
    else {
      target.classList.remove("opened-button");
      target.classList.add("closed-button");
    }
  }

  setElementToDelete(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.idOfElementToDelete = event.target.id;
  }

  deleteCard() {
    this.projectService.deleteProject(this.idOfElementToDelete);
  }

  setProjectToEdit(event: any) {
    var target = event.currentTarget;
    if (Number(this.projectToEdit.id) != target.id) {
      this.projectToEdit = Object.assign({}, this.projectService.findProjectById(target.id));
    }
  }

  editCard(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;   

    this.setEditability(target, Editability.On);

    var collapseButton = target.parentElement.querySelectorAll("#collapse-button")[0];
    if(collapseButton.attributes['aria-expanded'].value === 'false'){
      collapseButton.click();
    }
  }

  saveChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    let projectId = target.parentElement.id;

    this.projectService.editProject(projectId);
    this.setEditability(target, Editability.Off);
  }

  discardChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    this.projectService.setProjectToAnother(this.projectToEdit);

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
      projectWrapper.style.backgroundColor = "#eee";
    }
    else if (OfforOn === Editability.Off) {
      projectWrapper.style.backgroundColor = "white";
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

