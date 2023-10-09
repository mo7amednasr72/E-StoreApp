import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpRequest: HttpClient) { }

  createNewCart(model:any){
    return this.httpRequest.post(environment.baseAPI + 'carts' , model )
  }
}
