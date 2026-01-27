import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../model/users-model';
import { UnknownResource } from '../../model/unknownResource-model';

@Component({
  selector: 'app-edit-modal-component',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-modal-component.html',
  styleUrl: './edit-modal-component.scss',
})
export class EditModalComponent implements OnChanges {


  // Nos traemos los modelos de Users y UnknowResource
  @Input() item: Users | UnknownResource | null = null;
  @Input() section!: 'users' | 'resources';

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();


  private readonly fb = inject(FormBuilder);

  editForm!: FormGroup;

  // Detecta cambios en los @Input() y construye el formulario.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'] && this.item) {
      this.buildForm();
    }
  }

  //Construye el formulario según la sección
  private buildForm() {
    if (!this.item) return;
    // Type guard: El operador 'in' comprueba si una propiedad existe en el objeto.
    // Si 'first_name' existe en this.item, TypeScript entiende que es Users (no UnknownResource)
    // y permite acceder a sus propiedades. Lo mismo ocurre con 'name' para UnknownResource.
    if (this.section === 'users' && 'first_name' in this.item) {
      this.editForm = this.fb.group({
        avatar: [this.item.avatar || ''],
        first_name: [this.item.first_name, Validators.required],
        last_name: [this.item.last_name, Validators.required],
        email: [this.item.email, [Validators.required, Validators.email]]
      });
    } else if (this.section === 'resources' && 'name' in this.item) {
      this.editForm = this.fb.group({
        name: [this.item.name],
        year: [this.item.year],
        color: [this.item.color],
        pantone_value: [this.item.pantone_value || '']
      });
    }
  }

  onSave(){
    if(this.editForm.valid){
      this.save.emit(this.editForm.value);
    }
  }

  onCancel(){
    this.cancel.emit();
  }
}
