import { Component, Input, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';



type Column = {
  key: string;
  label: string;
}

@Component({
  selector: 'app-list-component',
  imports: [],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent implements OnInit, OnChanges {


  @Input() users: Users[] = [];
  @Input() resources: UnknownResource[] = [];
  @Input() section: 'users' | 'resources' = 'users'

  @Output() rowSelected = new EventEmitter<Users | UnknownResource>();



  columns: Column[] = [];
  tableData: any[] = [];

  // Primero nos carga la vista de users
  ngOnInit(): void {
    this.loadData();
  }

  // Preparado para cambiar a otro componente
  ngOnChanges(): void {
    this.loadData();
  }


  // Métodos para cargar los datos en la tabla
  loadData() {
    if (this.section === 'users') {
      this.columns = [
        { key: 'id', label: 'ID' },
        { key: 'first_name', label: 'Nombre' },
        { key: 'last_name', label: 'Apellido' },
        { key: 'email', label: 'Email' },
      ];
      this.tableData = this.users;

    }

    if (this.section === 'resources') {
      this.columns = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'year', label: 'Year' },
        { key: 'color', label: 'Color' },
        { key: 'pantone_value', label: 'Pantone' }
      ];
      this.tableData = this.resources;
    }
  }

  //Método que llama cada fila al hacer click
  selectRow(item: Users | UnknownResource) {
    this.rowSelected.emit(item);

  }
}




