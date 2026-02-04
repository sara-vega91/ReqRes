import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar-component/nav-bar-component";
import { ListComponent } from "../../components/list-component/list-component";
import { RestService } from '../../services/rest/rest-service';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';
import { Router } from '@angular/router';
import { PaginationComponent } from "../../components/pagination-component/pagination-component";
import { EditModalComponent } from "../../components/edit-modal-component/edit-modal-component";
import { format } from 'node:path';

@Component({
  selector: 'app-dashboard-page',
  imports: [NavBarComponent, ListComponent, PaginationComponent, EditModalComponent],
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
  selectedItem: Users | UnknownResource | null = null; //por defecto aparece ninguno clickado
  isModalOpen: boolean = false; //por defecto



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
        console.log('users', res.data, res.total_pages)
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
      this.loadSection(this.currentSection, this.currentPage + 1);

    }
  }

  // Página anterior
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.loadSection(this.currentSection, this.currentPage - 1);


    }
  }

  // Guardar fila seleccionada en el list
  onRowSelected(item: Users | UnknownResource) {
    this.selectedItem = item;

    //Abrimos el modal solo si estamos en la sección de users
    if (this.currentSection === 'users') {
      this.isModalOpen = true;
    }
  }


  //Guardar datos
  onSaveEdit(formData: Users | UnknownResource){

    //Users
    if(this.currentSection == 'users'){

      //Create
      if(this.selectedItem == null){
        this.restService.createUser(formData as Partial<Users>).subscribe({
          next: (newUser) => {
            this.users = [ ...this.users, newUser];
            this.closeModal();
          }
        });
        return;
      }

      //update
      const userId = (this.selectedItem as Users).id;
      this.restService.updateUser(userId, formData as Partial<Users>).subscribe({
        next: () =>{
          this.users = this.users.map(user =>
            user.id === userId ? {...user, ...formData} : user
          );
          this.closeModal();
        }
      });
    }
    
    // Resource
    if(this.currentSection == 'resources'){
      this.restService.createResource(formData as Partial<UnknownResource>).subscribe({
        next: (newResource) => {
          this.resources = [...this.resources, newResource];
          this.closeModal();
        }
      });
      return;
    }
   }

  onCancelEdit(){
    this.closeModal();
  }

  // Cerrar modal
  closeModal(){
    this.isModalOpen = false;
    this.selectedItem = null;
  }


  onLogout() {
    this.router.navigate(['/login'])
  }

  onAddItem(){

    this.selectedItem = null;
    this.isModalOpen = true;

  }

}
