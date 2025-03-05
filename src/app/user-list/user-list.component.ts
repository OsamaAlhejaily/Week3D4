import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = []; 
  selectedUserPosts: any[] = []; 
  selectedUserName: string = ''; 
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      error: (err: Error) => (this.errorMessage = err.message)
     
      this.users.forEach(user => {
        this.userService.getUserPosts(user.id).subscribe(posts => {
          user.postCount = posts.length; 
        });
      });
    });
  }
  //Show the posts when you click the post count
  loadUserPosts(userId: number, userName: string): void {
    this.userService.getUserPosts(userId).subscribe(posts => {
      this.selectedUserPosts = posts;
      this.selectedUserName = userName;
    });
  }
  
}
