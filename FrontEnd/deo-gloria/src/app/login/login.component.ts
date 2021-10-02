import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';

  authenticated: boolean = false;

  constructor(private accountService: AccountService) {
    console.log(`Login: rand: ${this.accountService.rand}`)
    this.accountService.authenticated$.subscribe(authenticated => {
      this.authenticated = authenticated;
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.logIn(this.username, this.password);
  }
}
