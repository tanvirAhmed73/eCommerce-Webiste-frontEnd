import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  paymentApi(token: string, amount: number): Observable<any> {
    return this.http.post('http://localhost:3000/api/payment', {
      token,
      amount,
    });
  }
}
