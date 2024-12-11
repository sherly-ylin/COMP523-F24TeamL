import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService, Team } from '../../services/team.service';

@Component({
  selector: 'app-team-dialog',
  standalone: true,
  imports: [],
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css'],
})
export class TeamDialogComponent {
  team_name: string = '';

  constructor(
    private dialogRef: MatDialogRef<TeamDialogComponent>,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: Team | null
  ) {
    if (data) {
      this.team_name = data.team_name;
    }
  }

  save(): void {
    if (this.data) {
      this.teamService
        .updateTeamName(this.data.team_id, this.team_name)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.teamService
        .createTeam(this.team_name)
        .subscribe(() => this.dialogRef.close(true));
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
