import { ApplicationConfig } from "@angular/core";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { importProvidersFrom } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SurveyModule } from 'survey-angular-ui';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        // importProvidersFrom(
        //     BrowserModule, 
        //     FormsModule, 
        //     MatTableModule, 
        //     MatButtonModule, 
        //     MatInputModule, 
        //     MatIconModule, 
        //     MatCheckboxModule, 
        //     MatOptionModule, 
        //     MatSidenavModule, // Added to imports
        //     MatListModule, // Added to imports
        //     SurveyModule, 
        //     ReactiveFormsModule, 
        //     BrowserAnimationsModule,
        // ),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
}
