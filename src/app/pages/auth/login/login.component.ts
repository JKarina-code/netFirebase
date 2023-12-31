import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { reauthenticateWithCredential } from '@angular/fire/auth';
import { ButtonProvider } from '../components/button-provider/button-provider.component';
import { AuthService, Credential } from '../../../core/services/auth.service';
interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProvider,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  //Service
  private authService = inject(AuthService);
  //Router
  private router = inject(Router);
  //SnackBar
  private snackBar = inject(MatSnackBar);
  //FormBuilder
  formBuilder = inject(FormBuilder);

  //form login
  formLogin: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  //Invalid Email
  get isEmailValid(): string | boolean {
    const email = this.formLogin.get('email');
    const isInvalid = email?.invalid && email?.touched;

    if (isInvalid) {
      return email.hasError('required')
        ? 'Email is required'
        : 'Enter a valid email';
    }

    return false;
  }

  //snackBar

  openSnackBar() {
    return this.snackBar.open('Succesfully Login', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
  async logIn() {
    if (this.formLogin.invalid) return;

    const credential: Credential = {
      email: this.formLogin.value.email || '',
      password: this.formLogin.value.password || '',
    };

    try {
      await this.authService.loginWithEmailAndPassword(credential);

      const snackBarRef = this.openSnackBar();
      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }
}
