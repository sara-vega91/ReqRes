import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar-component/nav-bar-component";
import { ListComponent } from "../../components/list-component/list-component";
import { RestService } from '../../services/rest/rest-service';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';
import { Router } from '@angular/router';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";

@Component({
  selector: 'app-dashboard-page',
  imports: [NavBarComponent, ListComponent, PaginationComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {


  private readonly restService = inject(RestService);
  private readonly router = inject(Router);

  //Sección actualmente seleccionada por defecto
  currentSection: 'users' | 'resources' = 'users';

  users: Users[] = [];
  resources: UnknownResource[] = [];
  currentPage: number = 1;
  totalPages: number = 1;



  ngOnInit(): void {
    //Carga inicial, sección por defecto
    this.loadSection(this.currentSection, this.currentPage);
  }


  /**
   * Método llamado por el NavBar al seleccionar sección
   * @param section - 'users' | 'resources'
   */

  onSectionChange(section: 'users' | 'resources') {
    this.currentPage = 1; //reiniciamos la página al cambiar de sección
    this.loadSection(section, this.currentPage);
  }


  /**
    * Método genérico para cargar una sección y página
    * @param section - 'users' | 'resources'
    * @param page - número de página a cargar
    */


  private loadSection(section: 'users' | 'resources', page: number) {
    this.currentSection = section;
    

    if (section === 'users') {
      this.restService.getUsers(page).subscribe(res => {
        this.users = res.data;
        this.totalPages = res.total_pages; //usamos res.data porque la api devuelve objeto con metadata
        this.currentPage = page;
        console.log(';users', res.data, res.total_pages)
      });
    } else {
      this.restService.getResources(page).subscribe(res => {
        this.resources = res.data;
        this.totalPages = res.total_pages;
        this.currentPage = page;
        console.log('resources', res.data, res.total_pages)
      });
    }
  }

  // Página siguiente
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadSection(this.currentSection, this.currentPage +1);

    }
  }


  // Página anterior
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.loadSection(this.currentSection, this.currentPage -1);


    }
  }




  onLogout() {
    this.router.navigate(['/login'])
  }

}
