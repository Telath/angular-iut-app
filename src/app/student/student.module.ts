import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SharedModule } from '../shared/shared.module';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentService } from './services/student.service';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentCardComponent } from './components/student-card/student-card.component';


@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    StudentFormComponent,
    StudentDetailsComponent,
    StudentCardComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule
  ],
  providers: [
    StudentService
  ],
})

export class StudentModule { }
