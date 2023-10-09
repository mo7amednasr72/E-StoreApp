import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpRequest: HttpClient) { }

  getAllProducts(){
    return this.httpRequest.get(environment.baseAPI + "products");
  }

  getAllCategories(){
    return this.httpRequest.get(environment.baseAPI + "products/categories")
  }

  getProductByCategory(keyword:string){
    return this.httpRequest.get(environment.baseAPI + "products/category/" + keyword)
  }

  getProductByID(id:number){
    return this.httpRequest.get(environment.baseAPI + "products/" + id);
  }

}
