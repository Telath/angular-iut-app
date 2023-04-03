import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GenericPopupComponent } from './components/generic-popup/generic-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [GenericPopupComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class SharedModule { }
