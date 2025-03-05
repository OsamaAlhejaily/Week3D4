// user-details.component.ts - Display user details and their posts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

interface User {
  id: number;
  name: string;
  email: string;
  address: { street: string; city: string };
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  posts: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    
    this.userService.getUsers().subscribe((users: User[]) => {
      this.user = users.find((u: User) => u.id === userId);
    });

    this.userService.getUserPosts(userId).subscribe(posts => {
      this.posts = posts;
    });
  }
}
