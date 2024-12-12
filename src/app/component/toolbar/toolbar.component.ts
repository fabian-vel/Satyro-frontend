import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isDarkTheme: boolean = false;


  constructor(private router: Router) {
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const body = document.body;

    if (this.isDarkTheme) {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }

  routingEvent(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
