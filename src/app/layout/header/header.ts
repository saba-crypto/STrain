import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import is from '@angular/common/locales/is';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.scss',
})
export class Header {
  public authService = inject(AuthService);
  public isAuthenticated = this.authService.isAuthenticated;
  ngOnInit() {
    console.log(this.isAuthenticated);
  }
}
