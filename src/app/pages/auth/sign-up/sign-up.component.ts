import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonProvider } from '../components/button-provider/button-provider.component';
import { AuthService, Credential } from '../../../core/services/auth.service';

interface SignUpForm {
  name: FormControl<string>;
  lastName: FormControl<string>;
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
  selector: 'app-sign',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  hide = true;
  //Service
  private authService = inject(AuthService);
  //Router
  private router = inject(Router);
  //SnackBar
  private snackBar = inject(MatSnackBar);
  //inputs formControl
  formBuilder = inject(FormBuilder);
  //form  signup
  formSign: FormGroup<SignUpForm> = this.formBuilder.group({
    name: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
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
  get isEmailInvalid(): string | boolean {
    const email = this.formSign.get('email');
    const isInvalid = email?.invalid && email.touched;
    if (isInvalid) {
      return email.hasError('required')
        ? 'This field is required'
        : 'Enter a valid  email';
    }

    return false;
  }
  //snackBar
  openSnackBar() {
    return this.snackBar.open('Succesfully Sign up', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
  //function sign up
  async signUp() {
    if (this.formSign.invalid) {
      return;
    }
    const credential: Credential = {
      email: this.formSign.value.email || '',
      password: this.formSign.value.password || '',
    };

    try {
      await this.authService.signUpWithEmailAndPassword(credential);

      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }
}
