import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from 'module';



@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule,],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {


  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);


  //FALTAN VALIDACION CUSTOM EN PASSWORD


  // FORM
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  navigateTo() {
    //Navegación a la página de registro
    this.router.navigate(['register']);
  }

  // Envía el formulario, si el formulario no es válido, maracmos todos los campos como tocados (futuras validaciones)
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    };
    // Obtenemos valores del form
    const { email, password } = this.loginForm.value;
    console.log('LOGIN: ', email, password);
  }
}
