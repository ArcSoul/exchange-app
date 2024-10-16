import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate([''])
      },
      error: (err) => {
        this.message = err.error.error
      }
    })
  }
}
