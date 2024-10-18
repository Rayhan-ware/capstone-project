import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../model/Task';
import { TaskServiceService } from '../service/task-service.service';
import { Status } from '../model/Status';
import { EditTaskContainerComponent } from '../edit-task-container/edit-task-container.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../model/User';
import { AssigneeDropdownDialogComponent } from '../assignee-dropdown-dialog/assignee-dropdown-dialog.component';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent  implements OnInit{

  @Input() task: Task={
    taskId: '',
    taskTitle: '',
    taskDescription: '',
    statusCode: '',
    emailId: '',
    timeSpent: 0,
    priority:''
  };
  
  statusTitle: string ="";
  statusColour: string="";
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() statuses: Status[] = [];
  users: User[] = [];
  showAssigneeDropdown: boolean = false;
  searchQuery: string = '';

  constructor(private dialog: MatDialog,private taskService: TaskServiceService){

  }
  ngOnInit(): void {
    const matchedStatus = this.statuses.find(status => status.statusCode === this.task.statusCode);
    if (matchedStatus) {
      this.statusTitle = matchedStatus.statusTitle;
      this.statusColour=matchedStatus.statusColour;
    }
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(EditTaskContainerComponent, {
      width: '500px',
      data: { task: this.task } // Pass the task data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onEditTaskClick() {
    this.openEditDialog();
    this.editTask.emit(this.task);
    
  }

  toggleAssigneeDropdown(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '250px'; // Adjust the width as needed
    dialogConfig.position = { top: event.clientY + 'px', left: event.clientX + 'px' };
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'dark-backdrop';

    const dialogRef = this.dialog.open(AssigneeDropdownDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Assign the selected emailId
        this.task.emailId = result;
      }
    });
  }


  
  getPriorityColor(): string {
    switch (this.task.priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'yellow';
      default:
        return 'transparent'; // Default color
    }
  }
}
