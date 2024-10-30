import { Component, OnInit } from '@angular/core';
import { Staffing, StaffingColumns } from 'src/app/models/staffing.model'
import { StaffingService } from 'src/app/services/staffing.service';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-staffing-list',
    templateUrl: './staffing-list.component.html',
    styleUrls: ['./staffing-list.component.css'],
    standalone: true,
    imports: [RouterLink, MatButton, MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIconButton, MatIcon, MatFormField, MatInput, FormsModule, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow]
})
export class StaffingListComponent implements OnInit {

  displayedColumns: string[] = StaffingColumns.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = StaffingColumns;
  name = '';

  constructor(private StaffingService: StaffingService) { }

  ngOnInit(): void {
    this.retrieveLogs();
  }

  retrieveLogs(): void {
    this.StaffingService.getAll()
      .subscribe({
        next: (data) => {
          this.dataSource = data
          console.log(data)
        },
        error: (e) => console.error(e)
      });
  }

  deleteAll(): void {
    this.StaffingService.deleteAll()
      .subscribe({
        next: (res) => {
          this.refreshList()
          console.log(res)
        },
        error: (e) => console.error(e)
      })
  }

  deleteOne(id: any): void {
    this.StaffingService.delete(id)
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

  editEntry(entry: Staffing) {
    this.StaffingService.update(entry.staff_name, entry)
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

  //   this.StaffingService.get(this.name)
  //     .subscribe({
  //       next: (data) => {
  //         this.Staffings = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}
