import { Component, Input } from '@angular/core';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';

@Component({
  selector: 'app-list-component',
  imports: [],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
})
export class ListComponent {

  @Input() users: Users[] = [];
  @Input() resources: UnknownResource[] = [];
  @Input() section: 'users' | 'resources' = 'users'
}
