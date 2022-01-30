import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from '../home/product';
import { User } from '../about/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_PRODUCT_URL = "http://localhost:3000/products";
  private SERVER_SUBSCRIBER_URL = "http://localhost:3000/subscribers";

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  getProducts(): Observable<any>{ 
		return this.http.get(this.SERVER_PRODUCT_URL).pipe(catchError(this.handleError));
	} 

  getProduct(id: number | string) {
    return this.getProducts().pipe(
      // (+) before `id` turns the string into a number
      map((products: Product[]) => products.find(product => product.id === +id)!)
    );
  }

  setProduct(productData: any, productId: any) {
    return this.http.put<any>(this.SERVER_PRODUCT_URL+"/"+productId, productData)
  }

  postSubscriber(user: User) {
    return this.http.post<any>(this.SERVER_SUBSCRIBER_URL, user);
  }

  postNewProduct(productData: any) {
    return this.http.post<any>(this.SERVER_PRODUCT_URL, productData)
  }

  deleteProduct(productId: any) {
    return this.http.delete<any>(this.SERVER_PRODUCT_URL+"/"+productId)
  }

}
