import { Component, OnInit } from '@angular/core';
import { SkillServices } from '../../services/skillservices';
import { Skill } from '../../viewmodels/skill';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: [
    './skills.component.css',
    '../new-project/new-project.component.css'
  ],
  animations: [
    trigger('visibilityChanged', [
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ])
    ])
  ]
})
export class SkillsComponent implements OnInit {

  thereIsAnEdit: boolean[] = [];
  skillToDelete: string;
  skills: Skill[];

  public popoverTitle: string = 'Are you sure?';
  public popoverMessage: string = 'Are you really sure you want to delete this employee?';

  constructor(private skillService: SkillServices) {
    this.skillService.getSkills().subscribe(result => {
      this.skills = result as Skill[];
    });
  }

  ngOnInit() {
  }

  search(event) {
    let text = (<HTMLInputElement>event.target).value;

    this.skills = [];
    for (let i = 0; i < this.skillService.skills.length; i++) {
      let name = this.skillService.skills[i].name;
      if (name.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
        this.skills.push(this.skillService.skills[i]);
      }
    }
  }

  editSkill(event) {
    this.setEditability(<HTMLElement>event.target, Editability.On);
  }

  setEditability(target : HTMLElement, OfforOn: Editability) {

    let editButtonParent = target.parentElement;
    let skillButton = <HTMLButtonElement>editButtonParent.querySelector("#collapse-button");
    skillButton.title = skillButton.innerHTML;

    let skillWrapper = <HTMLElement>document.getElementById("skill-wrapper");
    if (OfforOn === Editability.On) {
      this.thereIsAnEdit.push(true);
      skillWrapper.style.background = "linear-gradient(to right, rgba(238, 238, 238, 0.9), rgba(238, 238, 238, 0.5))";

      skillButton.setAttribute("contenteditable", "true");
      skillButton.classList.add("edited-button");
    }
    else if (OfforOn === Editability.Off) {
      this.thereIsAnEdit.pop();
      if (this.thereIsAnEdit.length === 0) {
        skillWrapper.style.background = "linear-gradient(to right, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5))";
      }

      skillButton.setAttribute("contenteditable", "false");
      skillButton.classList.remove("edited-button");
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

  getEditedSkill(target): Skill {

    let editButtonParent = target.parentElement;
    let skillButton = <HTMLButtonElement>editButtonParent.querySelector("#collapse-button");
    let nameOfSkill = skillButton.title.trim();

    let skill = new Skill();
    skill.id = Number((<HTMLElement>target).title);
    skill.name = nameOfSkill;

    return skill;
  }

  saveChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    this.skillService.editSkill(this.getEditedSkill(target).id);
    this.setEditability(target, Editability.Off);
  }

  discardChanges(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;

    this.skillService.setSkillToAnother(this.getEditedSkill(target));
    this.setEditability(target, Editability.Off);
  }

  setSkillToDelete(event) {
    var target = <HTMLElement>event.target;
    this.skillToDelete = target.id;
  }

  deleteCard() {

    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].id == Number(this.skillToDelete)) {
        this.skills.splice(i, 1);
        this.skillService.skills.splice(i, 1);
      }
    }

    this.skillService.deleteSkill(this.skillToDelete);
  }
}


enum Editability {
  On,
  Off
}
