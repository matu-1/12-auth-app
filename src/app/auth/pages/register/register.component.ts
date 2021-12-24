import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  form = this.fb.group({
    nombre: ['matias', [Validators.required, Validators.minLength(3)]],
    email: ['matu@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.form.value).subscribe(
      (_) => {
        this.router.navigateByUrl('/dashboard');
      },
      (err) => {
        Swal.fire('Error', err.message, 'error');
      }
    );
  }
}
