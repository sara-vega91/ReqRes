import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';

export const routes: Routes = [
    { path: '', component: LoginPage },
    { path: 'login', component: LoginPage },
    { path: 'register', component: RegisterPage },
    { path: 'dashboard', component: DashboardPage }
];
