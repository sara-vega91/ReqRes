import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-nav-bar-component',
  imports: [],
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.scss',
})
export class NavBarComponent {

  // @Output - envíamos la sección seleccionada al padre.

  @Output() sectionChange = new EventEmitter<'users' | 'resources'>();

  //Avisa al padre del logout
  @Output() logout = new EventEmitter<void>();

  selectSelection(section: 'users' | 'resources') {
    this.sectionChange.emit(section); //Emite el evento al padre
  }

  onLogout(){
    this.logout.emit();
  }
}
