import { Component, OnInit } from '@angular/core';
import { TeamService, Team } from '../services/team.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDivider
  ],
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css'],
})
export class TeamManagementComponent implements OnInit {
  teams: Team[] = [];
  displayedColumns: string[] = ['team_id', 'team_name', 'actions'];
  teamNameControl = new FormControl('', [Validators.required]); 
  editingTeam: Team | null = null;
  constructor(private teamService: TeamService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe((teams) => (this.teams = teams));
  }

  openDialog(team?: Team): void {
    this.editingTeam = team || null;
    this.teamNameControl.setValue(team?.team_name || '');
    const dialog = document.querySelector('#team-dialog') as HTMLElement;
    dialog.style.display = 'block';
  }
  closeDialog(): void {
    this.editingTeam = null;
    const dialog = document.querySelector('#team-dialog') as HTMLElement;
    dialog.style.display = 'none';
  }
  saveTeam(): void {
    if (this.editingTeam && this.teamNameControl.valid) {
      this.teamService
        .updateTeamName(this.editingTeam._id, this.teamNameControl.value!)
        .subscribe(() => {
          this.loadTeams();
          this.closeDialog();
        });
    } else {
      this.teamService.createTeam(this.teamNameControl.value!).subscribe(() => {
        this.loadTeams();
        this.closeDialog();
      });
    }
  }
  deleteTeam(team_id: number): void {
    if (confirm('Are you sure you want to delete this team?')) {
      this.teamService.deleteTeam(team_id).subscribe(() => this.loadTeams());
    }
  }
}
