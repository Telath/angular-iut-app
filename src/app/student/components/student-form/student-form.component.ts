import { StudentService } from './../../services/student.service';
import { Student } from '../../models/student';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface StudentFormData {
  isCreateForm: boolean;
  student: Student;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  classes: string[] = [
    'LP-DIM-FI',
    'LP-DIM-APP'
  ];

  studentForm = this.fb.group({
    id: [0, [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    class: ['', [Validators.required]],
    email: ['', [Validators.email]],
    dateOfBirth: ['', [Validators.required]]
  });

  constructor(public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentFormData, private fb: FormBuilder, 
    private studentService : StudentService, private _snackBar: MatSnackBar) {

      if(!data.isCreateForm){
        this.setStudentForm(data.student);
      }

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  setStudentForm(student: Student) {
    this.studentForm.setValue({
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      class: student.class, 
      email: student.email, 
      dateOfBirth: student.dateOfBirth
    });
  }

  get title(){
    if(this.data.isCreateForm){
      return 'Formulaire de création';
    }
    return 'Formulaire de modification';
  }

  get submitBtnName(){
    if(this.data.isCreateForm){
      return 'Ajouter';
    }
    return 'Modifier';
  }

  onSubmit(){
    if(this.studentForm.valid){
      this.studentForm.value.dateOfBirth = new Date(this.studentForm.value.dateOfBirth).toISOString();
      if(this.data.isCreateForm){
        this.studentForm.value.id = Date.now() + Math.random();
        this.studentService.create(this.studentForm.value as Student)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });

          this.dialogRef.close(true);
        });
      }else{
        this.studentService.update(this.studentForm.value as Student)
        .pipe(takeUntil(this.destroy$))
        .subscribe(result => {
          this._snackBar.open(result, '', {
            duration: 2000,
            panelClass: ['bg-success']
          });
          this.dialogRef.close(true);
        });
      }
    }
  }
}
