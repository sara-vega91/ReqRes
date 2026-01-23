import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-component',
  imports: [],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.scss',
})
export class PaginationComponent {

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;


  @Output() nextPage = new EventEmitter<void>();
  @Output() prevPage = new EventEmitter<void>();


}
