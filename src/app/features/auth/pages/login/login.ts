import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginBanner } from '../../components/login/login-banner/login-banner';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth.service';
import { switchMap } from 'rxjs';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  imports: [RouterLink, LoginBanner, FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private loginModel = signal({
    email: '',
    password: '',
  });

  public loginForm = form(this.loginModel, (path) => {
    email(path.email, { message: 'Please Enter A valid email address' });
    minLength(path.password, 6, { message: 'Password must contain at least 6 characters' });

    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });
  });

  public isLoading = signal<boolean>(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);

    this.authService.login(this.loginModel()).subscribe({
      next: () => {
        this.toastService.show('Login Successful!', 'success');
        this.router.navigate(['/']);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
