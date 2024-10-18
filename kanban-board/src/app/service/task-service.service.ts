import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Task } from '../model/Task';
import { Status } from '../model/Status';
import { AuthService } from './auth.service';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {



  private baseUrl = 'http://localhost:3000';
  private apiUrl = 'http://localhost:9000/api/task';
  statuses: Status[] = [];
  users: User[] = [];
  
  usersCache: User[] = []; // Cache for storing users
  private cacheExpirationTime = 60000; // Cache expiration time in milliseconds (e.g., 1 minute)
  private lastFetchTime: number = 0; // Timestamp of the last fetch

  constructor(private http: HttpClient, private authService: AuthService) { }


  getUsers(): Observable<User[]> {
    let authToken = this.authService.bearerToken;
    authToken = authToken.replace(/-/g, '+').replace(/_/g, '/') + "==".substring(0, (3 * authToken.length) % 4);
    console.log('token in TaskService:', authToken)
    const headers = { 'Authorization': 'Bearer ' + authToken }
    return this.http.get<User[]>(`${this.apiUrl}/user/tracks`, { headers }).pipe(
      map((users: User[]) => {
        this.usersCache = users; // Update cache with fetched users
        this.lastFetchTime = Date.now(); // Update last fetch time
        return users;
      }),
      catchError((error) => {
        console.error('Error fetching users from DB:', error);
        return of([]); // Return empty array in case of error
      })
    );
  }

  fetchUsersFromCache(): Observable<User[]> {
    // Check if cache is not expired and return cached data
    const currentTime = Date.now();
    if (currentTime - this.lastFetchTime < this.cacheExpirationTime && this.usersCache.length > 0) {
      return of(this.usersCache);
    } else {
      // Fetch data from DB if cache is expired or empty
      return this.getUsers();
    }
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/task`);
  }

  getStatus(): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/status`);
  }

  postTask(body: Task): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/user`, body);
  }

}
