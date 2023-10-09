import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/IProduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})

export class AllProductsComponent implements OnInit {

  products: IProduct[] = []
  categories: any[] = []
  cartProducts: any[] = []

  loading: boolean = false;

  constructor(private prdService: ProductService) {

  }
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getProducts() {
    this.loading = true;
    this.prdService.getAllProducts().subscribe(
      (res: any) => {
        this.loading = false;
        this.products = res;
      }, (err) => {
        this.loading = false;
        console.log(`Some Error Occured..... ${err.message}`);
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.prdService.getAllCategories().subscribe(
      (res: any) => {
        this.loading = false;
        this.categories = res;
      },
      (err) => {
        this.loading = false;
        console.log(`Some Error Occured..... ${err.message}`)
      }
    )
  }

  receivedCategory(event:any){
    let value = event.target.value;
    this.filterByCategory(value);
  }

  filterByCategory(value: string) {
    (value == 'all' ? this.getProducts() : this.getProductCategory(value));
  }

  getProductCategory(keyword: string) {
    this.loading = true;
    this.prdService.getProductByCategory(keyword).subscribe(
      (res: any) => {
        this.loading = false;
        this.products = res
      },
      (err) => {
        this.loading = false;
        console.log(`Some Error Occured..... ${err.message}`)
      }
    );
  }

  addToCart(event:any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
      let exist = this.cartProducts.find(prd => prd.item.id == event.item.id);
      if(exist){
        alert("Product is already in your cart boy!")
      }
      else{
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
      }
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts))
    } 
  }

}
