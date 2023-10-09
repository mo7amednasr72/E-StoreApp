import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: any[] =[]
  total: number=0
  successOrder:boolean=false

  constructor(private cartService: CartService){

  }
  ngOnInit(): void {
    this.getCartProducts()
    this.getCartTotalPrice()
  }

  getCartProducts(){
    if('cart' in localStorage){
      this.cartProducts=JSON.parse(localStorage.getItem('cart')!);
    }
  }

  getCartTotalPrice(){
    this.total=0;
    for(let prd of this.cartProducts){
      this.total += prd.item.price * prd.quantity;
    }
  }

  minusAmount(index:number){
    this.cartProducts[index].quantity--;
    this.saveChanges();
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++;
    this.saveChanges();
  }

  detectQuantityChange(){
    this.saveChanges();
  }

  deletePrd(index:number){
    this.cartProducts.splice(index, 1) // delete only 1 element from the index 
    this.saveChanges();

  }

  saveChanges(){
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getCartTotalPrice();
  }

  clearCart(){
    this.cartProducts = []
    this.saveChanges();
  }

  orderCart(){
    let _products = this.cartProducts.map(prd => {
      return {productId: prd.item.id, quantity: prd.quantity}
    })
    let model = { // this is an anonymous object
      userId: 5,
      date: new Date(),
      products:_products
    }

    this.cartService.createNewCart(model).subscribe(
      (res) => {
        this.successOrder=true;
      },
      (err) => {
        console.log(`some error occured ${err.Message}`)
      }
    )
  }
}
