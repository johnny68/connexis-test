import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ListUserService {
  public user: User;

  private messageSource = new BehaviorSubject<User>(this.user);
  currentMessage = this.messageSource.asObservable();

  private getallURL = 'http://localhost:3000/users/';
  private createUrl = 'http://localhost:3000/users/create';
  private editUrl = 'http://localhost:3000/users/edit';

  constructor(private router: Router,
    private http: Http) { }

  public getList() {
    return this.http.get(this.getallURL);
  }

  public getUser(user: User) {
    this.messageSource.next(user);
  }

  public getCities() {
    return this.http.get('./assets/cities.json');
  }
  public postUser(
    email: String,
    name: String,
    address: String,
    city: String,
    mobile: Number,
    state: String) {

    const body = {
      user_email: email,
      user_name: name,
      address: address,
      user_city: city,
      user_mobile_number: mobile,
      user_state: state
    };

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });

    console.log(body);

    return this.http.post(this.createUrl, body, requestOptions);
  }

  public editUser(
    email: String,
    name: String,
    address: String,
    city: String,
    mobile: Number,
    state: String,
    user_id: Number) {

    const body = {
      email: email,
      name: name,
      address: address,
      city: city,
      mobilenumber: mobile,
      state: state,
      user_id: user_id
    };

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const requestOptions = new RequestOptions({ headers: headers });

    console.log(body);

    return this.http.post(this.editUrl, body, requestOptions);
  }
}
