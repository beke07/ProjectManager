import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import { getBaseUrl } from "../main";
import { Skill } from "../viewmodels/skill";

@Injectable()
export class SkillServices {
  public skills: Skill[];

  constructor(private http: HttpClient) {
    this.getSkills().subscribe(result => this.skills = result as Skill[]);
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(getBaseUrl() + 'api/Skill/GetSkillList');
  }

  createNewSkill(nameOfSkill: string): Observable<Skill> {
    let newSkill = new Skill();
    newSkill.name = nameOfSkill;
    return this.http.post<Skill>(getBaseUrl() + 'api/Skill/CreateNewSkill', newSkill);
  }

  editSkill(skillid: number): any {
    let skill = this.findSkillById(Number(skillid));

    this.http.put<Skill>(getBaseUrl() + 'api/Skill/EditSkill', skill).subscribe(result => {
    }, error => console.error(error));
  }

  deleteSkill(skillid: string): any {
    let params = new HttpParams().set('skillid', skillid);
    return this.http.delete(getBaseUrl() + 'api/Skill/DeleteSkill', { params: params }).subscribe(result => {
      this.skills = result as Skill[];
    });
  }

  getSkillsForProject(projectId: string): Observable<Skill[]> {
    let params = new HttpParams().set('projectId', projectId);
    return this.http.get<Skill[]>(getBaseUrl() + 'api/Skill/GetSkillsForProject', { params: params });
  }

  getSkillsForEmployee(employeeId: string): Observable<Skill[]> {
    let params = new HttpParams().set('employeeId', employeeId);
    return this.http.get<Skill[]>(getBaseUrl() + 'api/Skill/GetSkillsForEmployee', { params: params });
  }

  setSkillToAnother(skill: Skill): any {
    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].id === Number(skill.id)) {
        this.skills[i].name = skill.name;
      }
    }
  }

  findSkillById(skillId: number): Skill {
    for (let i in this.skills) {
      if (this.skills[i].id === skillId) {
        return this.skills[i];
      }
    }
  }
}
