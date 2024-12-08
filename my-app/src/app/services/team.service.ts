import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Team {
  team_id: number;
  team_name: String;
  user_ids: String[];
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  teams$ = this.teamsSubject.asObservable();

  private baseUrl = 'http://localhost:3000/team';

  constructor(private http: HttpClient) {}

  getTeams() {
    let result = this.http.get<Team[]>(this.baseUrl).pipe(
      tap((teams) => {
        this.teamsSubject.next(teams);
        console.log('get teams:', teams);
      })
    );

    return result;
  }
  get currentTeams(): Team[] {
    return this.teamsSubject.value;
  }

  getTeamById(team_id: number) {
    return this.http.get<any>(`${this.baseUrl}/${team_id}`);
  }
  createTeam(team_name: String) {
    return this.http.post<any>(`${this.baseUrl}`, team_name);
  }

  updateTeamName(team_id: number, team_name: string) {
    return this.http.patch<any>(`${this.baseUrl}/${team_id}`, team_name);
  }

  deleteTeam(team_id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${team_id}`);
  }
}
