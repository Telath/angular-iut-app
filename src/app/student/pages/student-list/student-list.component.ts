import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericPopupComponent } from 'src/app/shared/components/generic-popup/generic-popup.component';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})

export class StudentListComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  students$: Observable<Student[]>;
  displayedColumns: string[] = ['firstName', 'lastName', 'class', 'email', 'update', 'delete'];

  constructor(private studentService: StudentService, private dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router){}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.students$ = this.studentService.get();
  }

  openStudentForm(student?: Student) {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      height: '85%',
      width: '60%',
      data: {
        isCreateForm: student ? false : true,
        student: student ? student : undefined
      }
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.fetchData();
        }
      });
  }

  delete(id: number) {
    const ref = this.dialog.open(GenericPopupComponent, {
      data: {
        title: 'Confirmation de suppression',
        message: 'êtes-vous sûr de vouloir supprimer cet étudiant ?',
        typeMessage: 'none',
        yesButtonVisible: true,
        noButtonVisible: true,
        cancelButtonVisible: false,
        defaultButton: 'No',
        yesButtonLabel: 'Oui',
        noButtonLabel: 'Non',
      },
    })

    ref.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.studentService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
              this._snackBar.open(result, '', {
                duration: 2000,
                panelClass: ['bg-success']
              });
              this.fetchData();
            });
        }
      });

  }

  showStudentDetails(studentId: number){
    this.router.navigate(['/students/'+ studentId])
  }

  }



