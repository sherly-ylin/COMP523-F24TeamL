import { Component, OnInit, inject } from '@angular/core';
import { Closed, ClosedColumns } from 'src/app/models/closed.model';
import { ClosedService } from 'src/app/services/closed.service';
import { RouterLink } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-closed-list',
  templateUrl: './closed-list.component.html',
  styleUrls: ['./closed-list.component.css'],
  imports: [
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatInput,
    FormsModule,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
  ],
})
export class ClosedListComponent implements OnInit {
  private ClosedService = inject(ClosedService);

  displayedColumns: string[] = ClosedColumns.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = ClosedColumns;

  name = '';

  ngOnInit(): void {
    this.retrieveLogs();
  }

  retrieveLogs(): void {
    this.ClosedService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log('data:', data);
      },
      error: (e) => console.error(e),
    });

  }

  deleteAll(): void {
    this.ClosedService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  deleteOne(id: any): void {
    this.ClosedService.delete(id).subscribe({
      next: (res) => {
        this.refreshList();
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveLogs();
  }

  editEntry(entry: Closed) {
    this.ClosedService.update(entry.uid, entry).subscribe({
      next: (res) => {
        this.refreshList();
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  // searchName(): void {
  //   this.currentLog = {};
  //   this.currentIndex = -1;

  //   this.ClosedService.get(this.name)
  //     .subscribe({
  //       next: (data) => {
  //         this.Closeds = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}
