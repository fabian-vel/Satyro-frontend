import { Component } from '@angular/core';
import {RouteService} from "./service/routeService/route.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'satyro-frontend';


  constructor(public routeService: RouteService) {
  }
}
