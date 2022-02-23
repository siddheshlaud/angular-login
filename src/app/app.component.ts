import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './_services/login.service';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent implements OnDestroy {
  user: string;
  subscription: Subscription;
  form: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // subscribe to home component messages
    // this.subscription = this.loginService.onMessage().subscribe((message) => {
    //   if (message) {
    //     this.messages.push(message);
    //   } else {
    //     // clear messages when empty message received
    //     this.messages = [];
    //   }
    // });
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.subscription = this.loginService.user.subscribe((userName) => {
      this.user = userName;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  submitForm() {
    console.log(this.form.getRawValue());
    this.loginService.saveLogin(this.form.get('username').value);
  }

  logout() {
    this.loginService.removeLogin();
  }

  clear() {
    this.form.reset();
  }
}
