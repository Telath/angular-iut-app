import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit{

  @Input() selectedStudent: Student;
  @Output() received: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
      this.received.emit(true);
  }

}


