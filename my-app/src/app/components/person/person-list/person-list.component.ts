import { Component, OnInit, inject } from '@angular/core';
import { Person, PersonColumns } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
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

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.css'],
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
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
    ]
})
export class PersonListComponent implements OnInit {
  private PersonService = inject(PersonService);

  displayedColumns: string[] = PersonColumns.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = PersonColumns;

  ngOnInit(): void {
    this.retrieveLogs();
  }

  retrieveLogs(): void {
    this.PersonService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  deleteAll(): void {
    this.PersonService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
        console.log(res);
      },
      error: (e) => console.error(e),
    });
  }

  deleteOne(id: any): void {
    this.PersonService.delete(id).subscribe({
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

  editEntry(entry: Person) {
    this.PersonService.update(entry.uid, entry).subscribe({
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
