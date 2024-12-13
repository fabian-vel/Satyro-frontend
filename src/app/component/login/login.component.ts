import { Component } from '@angular/core';
import {NavigationService} from "../../service/navigationService/navigation.service";
import {APP_ROUTES} from "../../shared/app-routes/paths";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hide = true;

  protected readonly APP_ROUTES = APP_ROUTES;

  constructor(private navigationService: NavigationService) {
  }

  routingEvent(route: string) {
    this.navigationService.navigateTo(route)
  }
}
