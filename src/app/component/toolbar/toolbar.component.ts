import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NavigationService} from "../../service/navigationService/navigation.service";
import {APP_ROUTES} from "../../shared/app-routes/paths";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isDarkTheme: boolean = false;

  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(private router: Router, private navigationService: NavigationService) {
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
    this.navigationService.navigateTo(route)
  }
}
