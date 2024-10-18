import { Component, EventEmitter, InjectionToken, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../model/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { User } from '../model/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.css'
})
export class AddTaskDialogComponent implements OnInit{
  task:Task={
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    statusCode: '',
    emailId: '',
    timeSpent: 0,
    priority:''
  }

  users: User[] = [];
  statuses: Status[] = [];
  filteredUsers!: Observable<User[]>;
  filteredStatuses!: Observable<Status[]>;
  selectedAssignee = '';
  selectedStatus = '';
  taskForm!: FormGroup;
  priorities = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];
  constructor(private fb: FormBuilder,
    private taskService: TaskServiceService,
   
    private dialogRef: MatDialogRef<AddTaskDialogComponent>) {
    
  } 
  
  ngOnInit(): void {

    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      taskDescription: ['', Validators.required],
      statusCode: ['', Validators.required],
      emailId: ['', Validators.required],
      priority: ['', Validators.required],
      timeSpent: [0, Validators.required]
    });


    this.taskService.getUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.taskForm.get('emailId')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsers(value))
      );
    });

    this.taskService.getStatus().subscribe(statuses => {
      this.statuses = statuses;
      console.log(statuses);
      this.filteredStatuses = this.taskForm.get('statusCode')!.valueChanges.pipe(
        startWith(''),
        map(value => this._filterStatuses(value))
      );
     // const statusTitle = this.getStatusTitlefromStatusCode(this.task.statusCode);
      
    });
  }
  
  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.firstName.toLowerCase().includes(filterValue) || user.lastName.toLowerCase().includes(filterValue));
  }

  private _filterStatuses(value: string): Status[] {
    const filterValue = value.toLowerCase();
    return this.statuses.filter(status => status.statusTitle.toLowerCase().includes(filterValue));
  }

  private getStatusTitlefromStatusCode(value: string) {
    const status = this.statuses.find(element => element.statusCode == value);
    return status?.statusTitle;

  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      console.log(formData);
      // Submit the form data or perform other actions
    } else {
      // Form is invalid, handle accordingly
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
