import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage implements OnInit {

  private readonly fb = inject(FormBuilder);



  ngOnInit(): void {
  }




  cancel() {
  }



  onSubmit() {

  }

}
