import { Component, OnInit } from '@angular/core';
import { Model, StylesManager } from 'survey-core';
import { HttpClient } from '@angular/common/http';
import { SurveyModule } from 'survey-angular-ui';

StylesManager.applyTheme('defaultV2');

// Move the surveyJson to an external file or service for better maintainability
const surveyJson = { /* surveyJson data */ };

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
  imports: [SurveyModule]
})
export class AddPersonComponent implements OnInit {
  title = 'Person Survey';
  surveyModel!: Model;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const survey = new Model(surveyJson);
    this.surveyModel = survey;

    // Handle survey completion and data saving
    survey.onComplete.add((sender: any, options: any) => {
      options.showDataSaving();
      this.submitSurveyData(sender.data, options);
    });
  }

  // Simplify API call using Angular's HttpClient
  submitSurveyData(data: any, options: any): void {
    this.http.post('http://localhost:3000/person_level', data)
      .subscribe({
        next: () => {
          options.showDataSavingSuccess();
          window.location.href = 'http://localhost:4200/person';
        },
        error: () => {
          options.showDataSavingError();
        }
      });
  }
}
