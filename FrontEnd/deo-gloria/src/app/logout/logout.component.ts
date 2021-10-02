import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  authenticated: boolean = true;

  constructor(private accountService: AccountService) {
    console.log(`Logout: rand: ${this.accountService.rand}`)
    this.authenticated = this.accountService.isLoggedIn();
    this.accountService.authenticated$.subscribe(authenticated => this.authenticated = authenticated);
  }

  ngOnInit(): void {
    this.accountService.logOut();
  }

}
