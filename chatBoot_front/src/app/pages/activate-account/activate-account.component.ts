import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message:string='';
  isOkay:Boolean=true;
  submitted:Boolean=false;

  constructor(
    private router: Router,
    private authService:AuthenticationService
  ) {
  }

  onCodeCompleted(token: any) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login'])

  }

  private confirmAccount(token: any) {
    this.authService.confirm({
      token
    }).subscribe({
      next:()=>{
        this.message ='your account has been successfully activate .\n Now you can proceed to Login';
        this.submitted=true;
        this.isOkay=true;
      },
      error:()=>{
        this.message ='Token has been Expired or Invalid';
        this.submitted=true;
        this.isOkay=false;
      }
    });
  }
}
