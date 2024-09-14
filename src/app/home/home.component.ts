import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import {
  NgxStripeModule,
  StripeCardComponent,
  StripeService,
} from 'ngx-stripe';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgxStripeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  constructor(
    private stripeService: StripeService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {}

  createToken(): void {
    const name = 'tips';
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          this.handleToken(result.token.id);
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  handleToken(token: string) {
    const amount = 1000;
    this.homeService.paymentApi(token, amount).subscribe({
      next: (response) => {
        console.log('the stripe has working', response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // stripe: Stripe | null = null;
  // card: any;

  // handlePaymentForm!: FormGroup;

  // // Publishable key from Stripe
  // readonly STRIPE_PUBLISHABLE_KEY = 'your-publishable-key';
  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.initailizeStep();
  // }
  // async initailizeStep() {
  //   this.stripe = await loadStripe(this.STRIPE_PUBLISHABLE_KEY);
  //   if (this.stripe) {
  //     const elements = this.stripe.elements();
  //     // Create a card element
  //     this.card = elements.create('card');
  //     this.card.mount('#card-element');
  //   }
  // }

  // async handlePayment() {
  //   if (this.stripe && this.card) {
  //     const { token, error } = await this.stripe.createToken(this.card);

  //     if (error) {
  //       console.error(error.message);
  //     } else {
  //       console.log('Token created:', token);
  //       // Send token to your backend to create a charge
  //     }
  //   }
  // }
}
