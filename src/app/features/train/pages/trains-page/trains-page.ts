import { Component } from '@angular/core';
import { PageHeading } from '../../components/page-heading/page-heading';
import { PageContent } from '../../components/page-content/page-content';

@Component({
  selector: 'app-trains-page',
  imports: [PageHeading, PageContent],
  templateUrl: './trains-page.html',
  styleUrl: './trains-page.scss',
})
export class TrainsPage {}
