import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // FORM
  registerForm = this.fb.nonNullable.group({
    avatar: [null],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],  // FALTA VALIDADOR CUSTOM
  })



  ngOnInit(): void {
  }


  cancel() {
    this.registerForm.reset();
  }

  // si login y bd, modificar
  onSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.value;
    console.log('Register submit', formData);

    if (this.registerForm.valid) {
      this.router.navigate(['/login']);
    }
  }

}
