import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class ListComponent implements OnInit, OnChanges{
 
  


  @Input() users: Users[] = [];
  @Input() resources: UnknownResource[] = [];
  @Input() section: 'users' | 'resources' = 'users'

  columns: Column[] = [];
  tableData: any[]= [];


   ngOnInit(): void {
   this.loadData();
  }
  ngOnChanges(): void {
    this.loadData();
  }

  loadData(){
    if(this.section === 'users'){
      this.columns = [
        {key: 'id', label: 'ID'},
        {key: 'first_name', label: 'Nombre'},
        { key: 'last_name', label: 'Apellido'},
        {key: 'email', label: 'Email'},
      ];
      this.tableData = this.users;
      
    }

    if(this.section === 'resources'){
      this.columns = [
        { key: 'id', label: 'ID'},
        { key: 'name', label: 'Name'},
        { key: 'year', label: 'Year'},
        { key: 'color', label: 'Color'},
        { key: 'pantone_value', label: 'Pantone'}
      ];
      this.tableData =  this.resources;
      
    }
  }
}


