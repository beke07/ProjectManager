import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Project } from '../../viewmodels/project';
import { ProjectServices } from '../../services/projectservices';
import { BsDatepickerConfig } from 'ngx-bootstrap';

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

  constructor(private projectService: ProjectServices) {
    this.datePickerConfig = (<any>Object).assign({}, {
      dateInputFormat: 'YYYY-MM-DD'
    });
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
    this.projectService.createNewProject(this.model);
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
