import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  prdDetails:any={}

  loading:boolean=false;
  id:number;

  constructor(private activatedRoute:ActivatedRoute, private productService:ProductService){
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getPrdDetails();
  }

  getPrdDetails(){
    this.loading=true;
    this.productService.getProductByID(this.id).subscribe(
      (res) => {
        this.loading=false;
        this.prdDetails = res;
      },
      (err) => {
        this.loading=false;
        console.log(`Some error occured... ${err.message}`)
      }
    )
  }



}
