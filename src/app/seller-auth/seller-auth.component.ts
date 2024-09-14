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

  // for toggle
  signUpToggle = true;
  loginToggle = false;

  showFire = false;
  // service
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.generateFloatingCircles();
    this.authService.reloadSeller();
    this.sellerSignUpForm = this.fb.group({
      sellerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onsubmitSellerForm(): void {
    console.log(this.sellerSignUpForm);
    if (this.sellerSignUpForm.valid) {
      const formData = this.sellerSignUpForm.value;
      this.authService.sellerSignUP(formData);
    } else {
      console.log('form is invalid');
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

  openLogin() {
    this.signUpToggle = false;
    this.loginToggle = true;
  }

  openSignUp() {
    this.signUpToggle = true;
    this.loginToggle = false;
  }
}
