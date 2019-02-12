import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListUserService } from './list-user.service';
import { User } from './user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users: object[];
  public user: User;

  constructor(private router: Router,
              private service: ListUserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.service.getList()
    .subscribe((response) => {
      const body = response.json();
      this.users = body.data;
      console.log(body.data);
    }, (error) => {
      console.log(error);
    });
  }

  public gotoUser(user: User) {
    console.log(user);
    this.service.getUser(user);
    this.router.navigate(['/edit']);
  }



}
