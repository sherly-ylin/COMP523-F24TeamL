import { Component, OnInit } from '@angular/core';
import { Person, EducationColumn } from 'src/app/models/person.model';
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
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-person-list',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.css'],
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
export class EducationComponent implements OnInit {
  displayedColumns: string[] = EducationColumn.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = EducationColumn;

  constructor(private PersonService: PersonService) {}

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
