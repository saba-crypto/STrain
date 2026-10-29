import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { DefaultButton } from './shared/buttons/default-button/default-button';
import { OutlineButton } from './shared/buttons/outline-button/outline-button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, OutlineButton],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('STrain');
}
