import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListUserService } from '../list-user/list-user.service';
import { User } from '../list-user/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public user: User;
  username: String;
  useremail: String;
  address: String;
  mobileNumber: Number;
  user_id: Number;
  public checker: boolean;
  public add_form: FormGroup;
  public cities: any[];
  public getCities: any[];
  public city: any[];
  public city1: Object[];
  public citynumber;
  state;

  constructor(private service: ListUserService,
    private router: Router,
    formBuilder: FormBuilder) {
    this.add_form = formBuilder.group({
      username: [null, Validators.required],
      useremail: [null, Validators.compose([Validators.required,
      Validators.pattern(/^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/)])],
      address: [null, Validators.required],
      city: [null, Validators.required],
      mobileNumber: [null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
      state: [null],
      cityselected: [null]
    });
  }

  ngOnInit() {
    this.service.currentMessage.subscribe(user => this.user = user);
    console.log(this.user);
    if (this.user != null) {
      this.checker = true;
      this.username = this.user.user_name;
      this.useremail = this.user.user_email;
      this.address = this.user.user_address;
      this.mobileNumber = this.user.user_mobile_number;
      this.user_id = this.user.user_id;
      this.getCity(this.user.user_city);
      this.loadCity();
    } else {
      this.checker = false;
      this.loadCity();
    }
  }

  loadCities(citycode, check) {
    console.log('inLoad');
    if (check === 1) {
      this.service.getCities()
        .subscribe((response) => {
          const body = response.json();
          this.getCities = body.data;
          this.city = this.getCities.find((item) => item.name === citycode.toString());
        }, (error) => {
          console.log(error);
        }, () => {
          console.log('oncomplete');
        });
    } else {
      this.service.getCities()
        .subscribe((response) => {
          const body = response.json();
          this.getCities = body.data;
          const city = this.getCities.find((item) => item.id === citycode.toString());
          const state = this.getCities.find((item) => item.id === citycode.toString());
          console.log(this.state = state.state);
          console.log(this.city = city.name);
        }, (error) => {
          console.log(error);
        }, () => {
          console.log('oncomplete');
        });
    }
  }

  loadCity() {
    this.service.getCities()
      .subscribe((response) => {
        const body = response.json();
        this.cities = body.data;
        console.log(this.cities);
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('oncomplete');
      });
  }

  getCity(code_city) {
    this.loadCities(code_city, 1);
    this.loadCities(this.city, 2);
  }

  citySelectedValue(id): void {
    this.citynumber = parseInt(id, 10);
    this.loadCities(this.city, 2);
  }

  public onSave() {
    console.log(this.username);
    console.log(this.useremail);
    console.log(this.address);
    console.log(this.mobileNumber);
    console.log(this.state);
    console.log(this.city);

    if (!this.checker) {
      this.service.postUser(this.useremail, this.username, this.address, this.city.toString(), this.mobileNumber, this.state)
        .subscribe((response) => {
          console.log(response);
          const body = response.json();
          if (response.status === 200 && body.status === 'success') {
            this.router.navigate(['/']);
          }
        }, (error) => {
          console.log(error);
        }, () => {
          console.log('on complete');
        });
    } else {
      this.service.editUser(this.useremail, this.username, this.address, this.city.toString(), this.mobileNumber, this.state, this.user_id)
      .subscribe((response) => {
        console.log(response);
        const body = response.json();
        if (response.status === 200 && body.status === 'success') {
          this.router.navigate(['/']);
        }
      }, (error) => {
        console.log(error);
      }, () => {
        console.log('on complete');
      });
    }
  }

}
