import {Routes} from '@angular/router';
import {SignupComponent} from "./pages/signup/signup.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {AuthGuard} from "./core/guards/Auth.guard";
import {AuthenticateGuard} from "./core/guards/Authenticate.guard";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";

export const routes: Routes = [
  {path: 'ingresar', component: LoginComponent, canActivate: [AuthenticateGuard]},
  {path: 'registrar', component: SignupComponent, canActivate: [AuthenticateGuard]},
  {path: 'forget-password', component: ForgetPasswordComponent, canActivate: [AuthenticateGuard]},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthenticateGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];
