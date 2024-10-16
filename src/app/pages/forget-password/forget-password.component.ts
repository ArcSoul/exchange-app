import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email: string = ""
  message: string = ""
  error: string = ""

  constructor(private authService: AuthService) {
  }

  sendForgetPassword() {
    this.message = ""
    this.error = ""
    this.authService.sendEmail(this.email).subscribe({
      next: (response) => {
        if (response.resultado) {
          this.message = "Se envio el correo exitosamente"
        } else {
          this.error = "Se no envio el correo"
        }
      },
      error: (err) => {
        this.error = err.error.mensaje
      }
    })
  }
}
