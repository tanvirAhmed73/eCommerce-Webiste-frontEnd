import { NgClass, NgIf, NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth/auth.service';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, NgStyle],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  sellerSignUpForm!: FormGroup;

  // service
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private renderer: Renderer2,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.generateFloatingCircles();
    this.authService.reloadSeller();

    this.sellerSignUpForm = this.fb.group({
      sellerName: ['', Validators.required],
      sellerEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSignUpSubmit(): void {
    if (!this.sellerSignUpForm.invalid) {
      if (
        this.sellerSignUpForm.value.password ===
        this.sellerSignUpForm.value.confirmPassword
      ) {
        // call the api
        this.authService.sellerSignUP(this.sellerSignUpForm.value);
      } else {
        // send the error
        console.log('send the error');
      }
    }
  }

  generateFloatingCircles(): void {
    const container = document.querySelector('.floating-circles-container');
    const numberOfCircles = 80; // Define how many circles you want

    for (let i = 0; i < numberOfCircles; i++) {
      const circle = this.renderer.createElement('div');
      this.renderer.addClass(circle, 'circle');

      // Randomize size, position, and animation duration for each circle
      const size = Math.random() * 100 + 20; // Random size between 20px and 120px
      const top = Math.random() * window.innerHeight; // Random Y position
      const left = Math.random() * window.innerWidth; // Random X position
      const duration = Math.random() * 10 + 10; // Random animation duration between 10s and 20s

      // Apply styles to the circle element
      this.renderer.setStyle(circle, 'width', `${size}px`);
      this.renderer.setStyle(circle, 'height', `${size}px`);
      this.renderer.setStyle(circle, 'top', `${top}px`);
      this.renderer.setStyle(circle, 'left', `${left}px`);
      this.renderer.setStyle(circle, 'animation-duration', `${duration}s`);

      // Append the circle to the container
      this.renderer.appendChild(container, circle);
    }
  }

  // for toggle between signUP and Login form
  signUpToggle = true;
  loginToggle = false;

  openLogin() {
    this.signUpToggle = false;
    this.loginToggle = true;
  }

  openSignUp() {
    this.signUpToggle = true;
    this.loginToggle = false;
  }
}
