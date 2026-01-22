import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar-component/nav-bar-component";
import { ListComponent } from "../../components/list-component/list-component";
import { RestService } from '../../services/rest/rest-service';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';

@Component({
  selector: 'app-dashboard-page',
  imports: [NavBarComponent, ListComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {


  private readonly restService = inject(RestService);

  //Sección actualmente seleccionada por defecto
  currentSection: 'users' | 'resources' = 'users';

  users: Users[] = [];
  resources: UnknownResource[] = [];



  ngOnInit(): void {
    this.loadUsers();
    this.loadResources();

  }



  /* Método que recibe la sección del NavBar
  @param section - 'users' o 'resources'
  */

  onSectionChange(section: 'users' | 'resources') {
    //Guardamos la sección actual para que ListComp sepa que renderizar
    this.currentSection = section;

    //Depende de la sección, llamamos al servicio correspondiente
    if (section === 'users') {
      this.loadUsers();
      console.log('Users: ', this.users)
    } else {
      this.loadResources();
      console.log('Resources: ', this.resources)
    }
  }


  // métodos para cargar users o resources desde el restService

  private loadUsers() {
    this.restService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  private loadResources() {
    this.restService.getResources().subscribe(resources => {
      this.resources = resources;
    });
  }

}
