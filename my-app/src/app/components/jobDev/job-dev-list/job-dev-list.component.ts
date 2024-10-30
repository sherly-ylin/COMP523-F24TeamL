import { Component, OnInit } from '@angular/core';
import { JobDev, JobColumns } from 'src/app/models/job-dev.model'
import { JobDevService } from 'src/app/services/job-dev.service';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-job-dev-list',
    templateUrl: './job-dev-list.component.html',
    styleUrls: ['./job-dev-list.component.css'],
    standalone: true,
    imports: [RouterLink, MatButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatFormField, MatInput, FormsModule, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class JobDevListComponent implements OnInit {

  displayedColumns: string[] = JobColumns.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = JobColumns;
  name = '';

  constructor(private JobDevService: JobDevService) { }

  ngOnInit(): void {
    this.retrieveLogs();
  }

  toggleEdit(element: any): void {
    element.isEdit = !element.isEdit;
  }

  retrieveLogs(): void {
    this.JobDevService.getAll()
      .subscribe({
        next: (data) => {
          this.dataSource = data
          console.log(data)
        },
        error: (e) => console.error(e)
      });
  }

  deleteAll(): void {
    this.JobDevService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList()
          console.log(res)
        },
        error: (e) => console.error(e)
      })
  }

  deleteOne(id: any): void {
    this.JobDevService.delete(id)
      .subscribe({
        next: (res) => {
          this.refreshList()
          console.log(res)
        },
        error: (e) => console.error(e)
      })
  }

  refreshList(): void {
    this.retrieveLogs();
  }

  editEntry(entry: JobDev) {
    this.JobDevService.update(entry.uid, entry)
      .subscribe({
        next: (res) => {
          this.refreshList();
          console.log(res);
        },
        error: (e) => console.error(e)
      })
  }

  // searchName(): void {
  //   this.currentLog = {};
  //   this.currentIndex = -1;

  //   this.JobDevService.get(this.name)
  //     .subscribe({
  //       next: (data) => {
  //         this.JobDevs = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}
