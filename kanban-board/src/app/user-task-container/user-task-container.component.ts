
// import { ChangeDetectorRef, Component, Input } from '@angular/core';


// interface Task {
//   title: string;
//   description: string;
//   email: string;
//   timeSpent: number;
//   status: string;
// }

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

// @Component({
//   selector: 'app-user-task-container',
//   templateUrl: './user-task-container.component.html',
//   styleUrls: ['./user-task-container.component.css']
// })
// export class UserTaskContainerComponent {

//   @Input() isFolderOpen: boolean = true;
//   @Input() fitlerData:any;

//   users = [
//     { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
//     { firstName: 'Bryan', lastName: 'Smith', email: 'bryan@example.com' },
//     { firstName: 'Navneeth', lastName: 'Krishnan', email: 'navneeth@example.com' }


//   ];
//   statusMapping: { [key: string]: string } = {
//     'Not Started': 'cdk-drop-list-0',
//     'In Progress': 'cdk-drop-list-1',
//     'Complete': 'cdk-drop-list-2',
//     'Delivered': 'cdk-drop-list-3',
//     'Status 3': 'cdk-drop-list-4',
//     'Status 5': 'cdk-drop-list-5',
//     'Status 6': 'cdk-drop-list-6',
//     'Status 7': 'cdk-drop-list-7',
//     'Status 8': 'cdk-drop-list-8'
//   };

//   get statusKeys(): string[] {

//     return Object.keys(this.statusMapping);
//   }


//   // Your tasks array here
//   tasks: Task[] = [
//     { title: 'Task 1', description: 'Description of Task 1', email: 'john@example.com', timeSpent: 2, status: 'In Progress' },
//     { title: 'Task 2', description: 'Description of Task 2', email: 'john@example.com', timeSpent: 3, status: 'Complete' },
//     { title: 'Task 3', description: 'Description of Task 2', email: 'john@example.com', timeSpent: 3, status: 'Complete' },

//     { title: 'Task 4', description: 'Description of Task 2', email: 'john@example.com', timeSpent: 3, status: 'Complete' },

//     { title: 'Task 5', description: 'Description of Task 2', email: 'john@example.com', timeSpent: 3, status: 'Complete' },

//     { title: 'Task 6', description: 'Description of Task 3', email: 'bryan@example.com', timeSpent: 1, status: 'Not Started' },
//     { title: 'Task 7', description: 'Description of Task 4', email: 'john@example.com', timeSpent: 1, status: 'Status 3' },
//     { title: 'Task 8', description: 'Description of Task 3', email: 'bryan@example.com', timeSpent: 1, status: 'Not Started' },
//     { title: 'Task 9', description: 'Description of Task 3', email: 'john@example.com', timeSpent: 1, status: 'Not Started' },
//     { title: 'Task 10', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Delivered' },
//     { title: 'Task 11', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Delivered' },
//     { title: 'Task 12', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Delivered' },
//     { title: 'Task 13', description: 'Description of Task 4', email: 'john@example.com', timeSpent: 1, status: 'Status 5' },
//     { title: 'Task 14', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Status 6' },
//     { title: 'Task 15', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Status 7' },
//     { title: 'Task 16', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Status 8' },
//     { title: 'Task 17', description: 'Description of Task 4', email: 'bryan@example.com', timeSpent: 1, status: 'Delivered' },
//     { title: 'Task 18', description: 'Description of Task 4', email: 'navneeth@example.com', timeSpent: 1, status: 'Delivered' },

//   ];

//   constructor(private cdr: ChangeDetectorRef) {}

//   getUserTasksForUser(email: string): any[] {
//     return this.tasks.filter(task => task.email === email);
//   }

//   getTotalTimeForUser(email: string): number {
//     return this.tasks.filter(task => task.email === email)
//       .reduce((total, task) => total + task.timeSpent, 0);
//   }

//   getStatuses(): string[] {
//     return Object.values(this.statusMapping);
//   }

//   getColumnSpan(status: string): number {
//     const tasksForStatus = this.getStatusTasks("", status);
//     return Math.max(Math.ceil(tasksForStatus.length / 2), 1);
//   }

//   getStatusTasks(userEmail: string, status: string): any[] {
//     return this.tasks.filter(task => task.email === userEmail && task.status === status);
//   }

//   getStatusColumns(): string[] {
//     return this.getStatuses();
//   }

//   getStatusTasksCount(status: string): number {
//     return this.tasks.filter(task => task.status === status).length;
//   }

//   onTaskDrop(event: DragEvent, newStatus: string, newEmail:string) {
//     if (event.dataTransfer) {
//       event.preventDefault();
//       const taskString = event.dataTransfer.getData('task');
//       const task: Task = JSON.parse(taskString);
//       task.email = newEmail
//       task.status = newStatus;
// this.tasks = this.tasks.map(t => {
//       if (t.title === task.title) {
//         return { ...t, status: newStatus , email:newEmail };
//       }
//       return t;
//     });
//       console.log(task);

//       this.cdr.detectChanges();
//     }
//   }

//   onTaskDragStart(event: DragEvent, task: Task) {
//     if (event.dataTransfer) {
//       event.dataTransfer.setData('task', JSON.stringify(task));
//     }
//   }

//   onTaskDragOver(event: DragEvent) {
//     event.preventDefault();
//   }



// }

import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TaskServiceService } from '../service/task-service.service';
import { Task } from '../model/Task';
import { User } from '../model/User';
import { Status } from '../model/Status';
import { FilterService } from '../service/filter.service';
import { EditTaskContainerComponent } from '../edit-task-container/edit-task-container.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-user-task-container',
  templateUrl: './user-task-container.component.html',
  styleUrls: ['./user-task-container.component.css']
})
export class UserTaskContainerComponent implements OnInit {

  @Input() isFolderOpen: boolean = true;
  @Input() fitlerData: any;

  users: User[] = [];
  tasks: Task[] = [];
  statuses: Status[] = [];
  filteredTasks: Task[] = [];
  orginialUsers: User[] = [];
  originalTasks: Task[] = [];
  originalStatuses: Status[] = [];
  tasksLoaded: boolean = false;
  selectedColumnIndex: number = -1;

  constructor(private cdr: ChangeDetectorRef, private taskService: TaskServiceService, private filterService: FilterService,private authService:AuthService) { }

  ngOnInit(): void {
console.log("auth token:",this.authService.bearerToken);

    this.taskService.getUsers().subscribe(users => {
      this.users = users;
      this.orginialUsers = users;


    });

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.tasksLoaded = true;
      this.originalTasks = tasks;
      

    });

    this.taskService.getStatus().subscribe(statusArray => {
      this.statuses = statusArray;
      this.originalStatuses = statusArray;
    });

    this.filterService.currentFilter.subscribe(filter => {

      console.log("filter recieved:", filter.filtersToApply)

      this.statuses = this.originalStatuses;
      this.tasks = this.originalTasks;
      this.users = this.orginialUsers;

      if (filter.selectedFilter.length > 0) {
        for (var i = 0; i < filter.selectedFilter.length; i++) {
          if (filter.selectedFilter[i] === "status") {
            this.statuses = filter.filtersToApply[i];

          }
          else if (filter.selectedFilter[i] === "email") {
            this.users = filter.filtersToApply[i];
          }
          else if(filter.selectedFilter[i] === "title")
            {
             this.tasks= this.tasks.filter(task =>
                task.taskTitle.toLowerCase().includes(filter.filtersToApply.toLowerCase())
              );
            }


        }
      }
      
    });
  }

  getUserTasksForUser(email: string): any[] {

    let filteredTasks = this.tasks.filter(task => task.emailId === email);
    
    return filteredTasks;
  }

  getStatusTasks(userEmail: string, status: string): Task[] {
    return this.tasks.filter(task => task.emailId === userEmail && task.statusCode === status);
  }

  getTotalTimeForUser(email: string): number {
    return this.tasks.filter(task => task.emailId === email).reduce((total, task) => total + task.timeSpent, 0);
  }

  getStatusTasksCount(status: string): number {
    return this.tasks.filter(task => task.statusCode === status).length;
  }

  onTaskDrop(event: DragEvent, newStatus: string, newEmail: string) {
    if (event.dataTransfer) {
      event.preventDefault();
      const taskString = event.dataTransfer.getData('task');
      const task: Task = JSON.parse(taskString);
      task.emailId = newEmail;
      task.statusCode = newStatus;
      this.tasks = this.tasks.map(t => {
        if (t.taskId === task.taskId) {
          return { ...t, statusCode: newStatus, emailId: newEmail };
        }
        return t;
      });
      this.cdr.detectChanges();
    }
  }

  onTaskDragStart(event: DragEvent, task: Task) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('task', JSON.stringify(task));
    }
  }

  onTaskDragOver(event: DragEvent) {
    event.preventDefault();
  }

  openQuickAddTask(statusCode:string,emailId:string,j:number){
    this.selectedColumnIndex = j;
  }
  onTaskAdded(title: string, priority: string) {
    // Handle the task addition here
    console.log('New task added:',title);
    // For example, you can add the task to the list of tasks
    const newTask: Task = {
      taskId: '', // Assign a unique taskId
      taskTitle: title,
      taskDescription: '',
      statusCode: '', // Assign the appropriate status code
      emailId: '', // Assign the appropriate emailId
      timeSpent: 0,
      priority: priority
    };
    // Add the new task to the tasks array
    this.tasks.push(newTask);
   
    // Hide the quick-add task card
    this.selectedColumnIndex = -1;
  }

  onQuickAddCardClosed()
  {this.selectedColumnIndex = -1;}
}

