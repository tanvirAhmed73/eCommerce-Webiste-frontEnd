import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Appsettings } from '../../utlis/app-setting';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  private baseIDMUrl = Appsettings.GG_IDM_ENDPOINT;
  constructor(private http: HttpClient, private router: Router) {}

  sellerSignUP(data: object) {
    this.http
      .post('http://localhost:3000/auth/seller-sign-up', data, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['cart']);
        }
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['cart']);
    }
  }
}
