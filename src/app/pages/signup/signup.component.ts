import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  register(): void {
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigate([''])
      },
      error: (err) => {
        this.message = err.error.mensaje
      }
    })
  }
}
