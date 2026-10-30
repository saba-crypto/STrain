import { Component } from '@angular/core';
import { Section1 } from '../../components/sections/section-1/section-1';

@Component({
  selector: 'app-home-page',
  imports: [Section1],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
