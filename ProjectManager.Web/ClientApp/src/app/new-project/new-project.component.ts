import { Component, OnInit } from '@angular/core';
import { Project } from '../../viewmodels/project';
import { ProjectServices } from '../../services/projectservices';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [
    './new-project.component.css',
    '../projects/projects.component.css'
  ]
})
export class NewProjectComponent implements OnInit {

  constructor(private projectService: ProjectServices) { }

  ngOnInit() { }

  public model = new Project();
  public bottomBorderRadius = "3px";

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
    this.projectService.createNewProject(this.model);
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
