import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../model/User';
import { TaskServiceService } from '../service/task-service.service';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-assignee-dropdown-dialog',
  templateUrl: './assignee-dropdown-dialog.component.html',
  styleUrls: ['./assignee-dropdown-dialog.component.css']
})
export class AssigneeDropdownDialogComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';

  constructor(
    private taskService: TaskServiceService,
    private dialogRef: MatDialogRef<AssigneeDropdownDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.taskService.fetchUsersFromCache().subscribe(users => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers(): void {
    if (!this.searchQuery) {
      this.filteredUsers = this.users;
      return;
    }
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
      
    );
    
  }

  selectAssignee(emailId: string): void {
    this.dialogRef.close(emailId);
    emailjs.init('TsJyI2fk-sY-g13Yz')
    emailjs.send("service_7kf02fr","template_ihbtqvb",{
      from_name: "john",
      to_name: "navneeth",
      message: "test123",
      reply_to: "",
      to_email: "navaneethkrishnans4@gmail.com",
      }).then((response) => {
        console.log('Email sent successfully:', response);
    }, (error) => {
        console.error('Email could not be sent:', error);
    });
  }
}
