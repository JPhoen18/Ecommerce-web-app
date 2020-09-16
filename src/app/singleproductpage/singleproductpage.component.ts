import { Component, OnInit } from '@angular/core';
import {ProductpageserviceService} from '../productpageservice.service';
import {UsercartserviceService} from '../usercartservice.service';
import {UsercredsService} from '../usercreds.service';
import {SharedvarsService} from '../sharedvars.service';
import {LikeditemsService} from '../likeditems.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-singleproductpage',
  templateUrl: './singleproductpage.component.html',
  styleUrls: ['./singleproductpage.component.css']
})
export class SingleproductpageComponent implements OnInit {

  userLogged: any;

  productObject: any;
  imgSrcString: any;
  inStockCheck: any;
  productCount: any;
  invalidProductAmountMessage: any;
  invalidLikeButtonMessage: any;
  showCartPage: any;

  constructor(private productservice: ProductpageserviceService, private cartservice: UsercartserviceService,
  private router : Router, private sharedvars : SharedvarsService, private user : UsercredsService,
  private likeditems : LikeditemsService) { }

  ngOnInit(){
    this.productservice.currentProductRefObj
      .subscribe((res) =>{
          console.log("Here is the product info");
          console.log(res);

          if(!res){
            res = this.productservice.getProduct();
          };

          this.productCount = 1;
          this.productObject = res;
          this.imgSrcString = this.productObject.itemimage[0].itemfirstimage;
          this.inStockCheck="No";
          if(this.productObject.iteminfo[0].currentitemstock>0){
            this.inStockCheck="Yes"
          }
      })
  }

  addOne(){
     if(this.productCount<10){
       this.productCount++;
       return;
     }
     this.invalidProductAmountMessage = "Cannot exceed 10 items per order.  Don't be greedy!";
  }

  minusOne(){
    if(this.productCount>1){
      if(this.invalidProductAmountMessage == "Cannot exceed 10 items per order.  Don't be greedy!"){
         this.invalidProductAmountMessage = "";
      }
      this.productCount--;

    }
  }

  setMainImage(imagetoset){
    console.log(imagetoset);
    this.imgSrcString = imagetoset;
  }

  async addToCart(){
    //this.productObject
    await this.cartservice.setCartSessionVar(this.productObject, this.productCount);
    var cartChecker = await this.cartservice.getCartSessionVar();
    console.log(cartChecker);
    this.showCartPage = true;
    await this.sharedvars.sendCartRefresh();

  }

  cartPage(){
     this.router.navigateByUrl('/toCartPage');
  }

  async likeditem(){
    this.userLogged = await this.user.getSessionStorage();
    console.log(this.userLogged);
      if(this.userLogged==undefined){
         console.log("User not logged in.  Needs to sign in")
         this.invalidLikeButtonMessage = "You must log in in order to like items";
         return;
       }
        await this.likeditems.recordAsLiked(this.productObject.iteminfo[0].itemid, JSON.parse(this.userLogged).id, this.checkLiked.bind(this));
    }

    async checkLiked(res, err){
           console.log('Here is the item that was liked');
           console.log(res);
    }

}
