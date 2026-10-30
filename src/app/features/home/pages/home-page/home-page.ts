import { Component } from '@angular/core';
import { Section1 } from '../../components/sections/section-1/section-1';
import { Section2 } from '../../components/sections/section-2/section-2';
import { Section3 } from '../../components/sections/section-3/section-3';

@Component({
  selector: 'app-home-page',
  imports: [Section1, Section2, Section3],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
