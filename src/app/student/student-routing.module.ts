import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';

const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: ':id',
    component: StudentDetailsComponent
  }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
