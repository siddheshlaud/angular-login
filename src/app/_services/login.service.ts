import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  user: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor() {}

  saveLogin(userName: string) {
    localStorage.setItem('user', userName);
    this.user.next(userName);
  }

  getLogin() {
    return localStorage.getItem('user');
  }

  removeLogin() {
    localStorage.setItem('user', '');
    this.user.next('');
  }
}
