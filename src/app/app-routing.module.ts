import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from "./component/event/event.component";
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {APP_ROUTES} from "./shared/app-routes/paths";

const routes: Routes = [
  {path: APP_ROUTES.HOME, component: HomeComponent},
  {path: APP_ROUTES.EVENT, component: EventComponent},
  {path: APP_ROUTES.LOGIN, component: LoginComponent},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
