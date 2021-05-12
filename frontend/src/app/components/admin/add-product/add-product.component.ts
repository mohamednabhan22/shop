import { productService } from './../../products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from'@angular/router'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit,OnDestroy {
  subscription: Subscription;


  constructor(private productService:productService,private router:Router) { }
  fileToUpload: File = null;

  catogries:{id:number,name:string}[]=[

    {id:6,name:"fruit"},     {id:3,name:"dairy"},{id:4,name:"meat"}, {id:1,name:"bakery"},
    {id:7,name:" drinks"}, {id:2,name:"takeaway"},{id:5,name:"seafood"}
    ]
  ngOnInit(): void {

    
  }
  addProduct(form:NgForm){
    console.log(form.value)
    console.log(this.fileToUpload)

    let file=this.fileToUpload

    let name=form.value.name
    let price=form.value.price

    let description=form.value.description
    let category=form.value.category

    this.subscription=this.productService.addProduct(name,price,description,category,file).subscribe(
  (res)=>{console.log(res)
    this.router.navigate(['/products'])
},
(err)=>{console.log(err)}
)

  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
