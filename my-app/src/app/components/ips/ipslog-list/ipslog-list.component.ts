import { Component, OnInit } from '@angular/core';
import { IpsLog, IPSColumns } from 'src/app/models/ips-log.model';
import { IpslogService } from 'src/app/services/ipslog.service';
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
    selector: 'app-ipslog-list',
    templateUrl: './ipslog-list.component.html',
    styleUrls: ['./ipslog-list.component.css'],
    imports: [
        RouterLink,
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
    ]
})
export class IpslogListComponent implements OnInit {
  displayedColumns: string[] = IPSColumns.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = IPSColumns;
  name = '';

  constructor(private IpsLogService: IpslogService) {}

  ngOnInit(): void {
    this.retrieveLogs();
  }

  retrieveLogs(): void {
    this.IpsLogService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  deleteAll(): void {
    this.IpsLogService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  deleteOne(id: any): void {
    this.IpsLogService.delete(id).subscribe({
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

  editEntry(entry: IpsLog) {
    this.IpsLogService.update(entry.staff_name, entry).subscribe({
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

  //   this.IpsLogService.get(this.name)
  //     .subscribe({
  //       next: (data) => {
  //         this.IPSLogs = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}
