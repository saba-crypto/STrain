import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LoginBanner } from '../../components/login/login-banner/login-banner';
import { finalize } from 'rxjs';

@Component({
  imports: [RouterLink, LoginBanner, FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private registerModel = signal({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  public registerForm = form(this.registerModel, (path) => {
    required(path.firstName, { message: 'First name is required' });
    required(path.lastName, { message: 'Last name is required' });
    email(path.email, { message: 'Please Enter A valid email address' });
    minLength(path.password, 6, { message: 'Password must contain at least 6 characters' });

    required(path.email, { message: 'Email is required' });
    required(path.password, { message: 'Password is required' });
  });

  public isLoading = signal<boolean>(false);

  onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading.set(true);

    this.authService
      .register(this.registerModel())
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
      )
      .subscribe(() => {
        this.toastService.show('Registration Successful!', 'success');
        this.router.navigate(['/auth/login']);
      });
  }
}
