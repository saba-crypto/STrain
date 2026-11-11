import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginBanner } from '../../components/login/login-banner/login-banner';

@Component({
  imports: [RouterLink, LoginBanner],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {}
