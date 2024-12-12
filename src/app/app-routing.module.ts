import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventComponent} from "./component/event/event.component";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'event', component: EventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
