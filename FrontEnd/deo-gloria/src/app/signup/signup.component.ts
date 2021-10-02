import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.signUp(this.username, this.password);
  }
}
