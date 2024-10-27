import { Component, OnInit } from '@angular/core';
import { Model, StylesManager } from "survey-core";

// const SURVEY_ID = 1;
StylesManager.applyTheme("defaultV2");
const surveyJson = {
  "title": "Job development log",
  "description": "Please fill out information about the client below",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "date_participated",
          "inputType":"date",
          "title": "What were the dates the IPS Staff participated in trainings/PTO? (MM/DD/YYYY)",
          "isRequired": true,
          "description": "Add more dates below if applicable"
        },
        {
          "type": "text",
          "name": "date_participated2",
          "startWithNewLine":false,
          "inputType":"date",
          "title": "date 2",
          "visibleIf": "{date_participated} notempty",
          "isRequired": false
        },
        {
          "type": "text",
          "name": "date_participated3",
          "startWithNewLine":false,
          "inputType":"date",
          "title": "date 3",
          "visibleIf": "{date_participated2} notempty",
          "isRequired": false
        },
        {
          "type": "text",
          "name": "date_participated4",
          "startWithNewLine":false,
          "inputType":"date",
          "title": "date 4",
          "visibleIf": "{date_participated3} notempty",
          "isRequired": false
        },
        {
          "type": "text",
          "name": "date_participated5",
          "startWithNewLine":false,
          "inputType":"date",
          "title": "date 5",
          "visibleIf": "{date_participated4} notempty",
          "isRequired": false
        },
        {
          "type": "text",
          "name": "uid",
          "title": "What is the ID of the client?",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "employment_goal",
          "title": "What are the Individual's Employment Goal?",
          "isRequired": true
        },
        {
          "type": "text",
          "name": "employer_contacted",
          "title": "Who was the Employer Contacted?",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "employer_hiring",
          "title": "Does the Employer Contact have firing authority?",
          "choices": [
            {
              "value": "Yes",
              "text": "Yes"
            },
            {
              "value": "No",
              "text": "No"
            }
          ],
          "isRequired": true
        },
        {
          "type": "checkbox",
          "name": "contact_method",
          "title": "Contact method?",
          "description": "i.e., in person, via telephone, email, individual served made contact, etc.",
          "isRequired": true,
          "choices":["in person","via telephone","email","individual served made contact"],
          "showOtherItem":true
        },
        {
          "type": "text",
          "name": "date_of_contact",
          "title": "Date of Contact",
          "inputType":"date",
          "isRequired": true
        },
        {
          "type": "radiogroup",
          "name": "nature_of_visit",
          "title": "What was the Nature of the Visit?",
          "choices": [
            {
              "value": "First Meeting",
              "text": "First Meeting"
            },
            {
              "value": "Second Meeting",
              "text": "Second Meeting"
            },
            {
              "value": "Ongoing",
              "text": "Ongoing"
            }
          ],
          "isRequired": true
        },
        {
          "type": "text",
          "name": "visit_desc",
          "title": "Description of the visit.",
          "isRequired": true
        }
      ],
      "title": "Please fill out the Job Development Log below.",
      "description": "Job Development Log"
    }
  ]
}




@Component({
  selector: 'app-add-job-dev',
  templateUrl: './add-job-dev.component.html',
  styleUrls: ['./add-job-dev.component.css']
})
export class AddJobDevComponent implements OnInit {


  title = 'Job Development Log';
  surveyModel!: Model;


  ngOnInit() {
    const survey = new Model(surveyJson);
    this.surveyModel = survey;
    survey.onComplete.add(function (sender: any, options: any) {
      options.showDataSaving();
      const xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:3000/jobdev');
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.onload = xhr.onerror = function () {
        if (xhr.status == 200) {
          // Display the "Success" message (pass a string value to display a custom message)
          options.showDataSavingSuccess();
          // Alternatively, you can clear all messages:
          // options.showDataSavingClear();
          window.location.href = 'http://localhost:4200/jobDev';
        } else {
          // Display the "Error" message (pass a string value to display a custom message)
          options.showDataSavingError();
        }
      };
      xhr.send(JSON.stringify(sender.data));
    })
  }
}
