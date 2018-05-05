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
}
