import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Team {
  team_id: number;
  team_name: String;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  teams$ = this.teamsSubject.asObservable();

  private baseUrl = 'http://localhost:3000/teams';

  constructor(private http: HttpClient) {
  }

  getTeams() {
    return this.http
      .get<Team[]>(this.baseUrl)
      .pipe(tap((teams) => this.teamsSubject.next(teams)));
  }
  get currentTeams(): Team[]{
    return this.teamsSubject.value;
  }

  createTeam(team_name: String) {
    return this.http.post<any>(`${this.baseUrl}/new`, team_name);
  }

  deleteTeam(team_id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${team_id}`);
  }

  updateTeamName(team_id: number, team_name: string) {
    return this.http.patch<any>(`${this.baseUrl}/${team_id}`, team_name);
  }
}
