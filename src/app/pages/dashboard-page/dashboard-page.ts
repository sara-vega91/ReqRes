import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar-component/nav-bar-component";
import { ListComponent } from "../../components/list-component/list-component";

@Component({
  selector: 'app-dashboard-page',
  imports: [NavBarComponent, ListComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

}
