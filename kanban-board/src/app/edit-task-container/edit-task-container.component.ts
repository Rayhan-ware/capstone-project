import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { User } from '../model/User';
import { Task } from '../model/Task';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-container',
  templateUrl: './edit-task-container.component.html',
  styleUrls: ['./edit-task-container.component.css']
})
export class EditTaskContainerComponent implements OnInit {
  taskForm!: FormGroup;
  task: Task = {
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    statusCode: '',
    emailId: '',
    timeSpent: 0,
    priority:''
  };
  users: User[] = [];
  statuses: Status[] = [];
  filteredUsers!: Observable<User[]>;
  filteredStatuses!: Observable<Status[]>;
  selectedAssignee = '';
  selectedStatus = '';
  priorities = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];
  constructor(private fb: FormBuilder,
    private taskService: TaskServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTaskContainerComponent>) {
    this.task = data.task;
  } 

  ngOnInit(): void {

    console.log(this.task);


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
      const statusTitle = this.getStatusTitlefromStatusCode(this.task.statusCode);
      if (statusTitle) {
        this.taskForm.get('statusCode')!.setValue(statusTitle);
      }
    });

    this.taskForm = this.fb.group({
      taskTitle: [this.task.taskTitle, Validators.required],
      taskDescription: [this.task.taskDescription, Validators.required],
      statusCode: ['', Validators.required],
      emailId: [this.task.emailId, Validators.required],
      priority: [this.task.priority, Validators.required],
      timeSpent: [this.task.timeSpent, Validators.required]
    });

    console.log(this.getStatusTitlefromStatusCode(this.task.statusCode))
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
      // Submit the form data or perform other actions
    } else {
      // Form is invalid, handle accordingly
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
