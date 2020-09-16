import { Component, OnInit } from '@angular/core';
import {UsercartserviceService} from '../usercartservice.service';
import {UsercredsService} from '../usercreds.service';
import {SharedvarsService} from '../sharedvars.service';
import {ModalcommunicationService} from '../modalcommunication.service';
import  { LoginsignupmodalComponent } from '../loginsignupmodal/loginsignupmodal.component';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {WarningdialogComponent} from '../warningdialog/warningdialog.component';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-shoppingcartpage',
  templateUrl: './shoppingcartpage.component.html',
  styleUrls: ['./shoppingcartpage.component.css'],
  animations: [
  trigger('listStagger', [
    transition('* <=> *',[
      query(':enter', //only defined elements being added, and where they are going from and to
      [
        style({opacity: 0, transform: 'translateY(-15px)'}),
        stagger('50ms',
        animate('550ms ease-out',
        style({ opacity: 1, transform: 'translateY(0px)'})))
      ], {optional: true }),
      query( ':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true
    })
  ])
])

]
})
export class ShoppingcartpageComponent implements OnInit {

  cartPageProducts: any;
  finalCartPageProductArray: any;
  productCount: any;
  invalidProductAmountMessage: any;
  inStockCheck: any;
  totalCartPrice: any;
  cartIsEmpty: any;
  userInfo: any;
  modalRef: MDBModalRef;
  cartEmptyFull: any;

  constructor(public dialog: MatDialog, private modalService: MDBModalService, private modalReferenceService: ModalcommunicationService,
    private router : Router, private cartservices: UsercartserviceService,
     private user: UsercredsService, private sharedVars: SharedvarsService) { }

  async ngOnInit(){

      this.firstCycle();

  }

  async firstCycle(){
    await this.sharedVars.sendCartRefresh();
    this.totalCartPrice = 0;

    this.cartPageProducts = await this.cartservices.getCartSessionVar();
    console.log(this.cartPageProducts);
    this.cartEmptyFull = true;

    if(this.cartPageProducts==null){
      console.log("empty cart");
      this.cartEmptyFull = false
      this.invalidProductAmountMessage = "Your Cart Is Empty";
      return;
    }

    if(this.cartPageProducts.length==undefined){
      console.log("empty cart");
      this.cartEmptyFull = false
      this.invalidProductAmountMessage = "Your Cart Is Empty";
      return;
    }

    if(this.cartPageProducts.length==0){
      console.log("empty cart");
      this.cartEmptyFull = false
      this.invalidProductAmountMessage = "Your Cart Is Empty";
      return;
    }

    console.log(this.cartEmptyFull);

    console.log(this.cartPageProducts);

    for(var x of this.cartPageProducts){
      console.log(x);
      var cartPageCopyArray = this.cartPageProducts.slice();

         var temparray = await cartPageCopyArray.filter(res => res.iteminfo[0].itemid == x.iteminfo[0].itemid);

         x.cartitemamount = temparray.length;

    }

    console.log(this.cartPageProducts);

    var secondtemparray;
    //var idchecker = secondtemparray[0].iteminfo[0].itemid;
    //var nextidchecker;
    this.finalCartPageProductArray = [1];

// This is the code to create an array with only unique products (filtered) with their item counts
//** This works as of 6/3/2020 **
    for(var y of this.cartPageProducts){
       console.log(y);
       var checkExist = false;
       secondtemparray = this.cartPageProducts.slice();
      // var thirdTempArray = secondtemparray.filter(res => res.iteminfo[0].itemid == y.iteminfo[0].itemid);

        var thirdTempArray = await secondtemparray.filter(res => res.iteminfo[0].itemid == y.iteminfo[0].itemid);

       if(this.finalCartPageProductArray[0]==1){
         console.log("stuck here")
         this.finalCartPageProductArray[0] = thirdTempArray[0];
         continue;
       }

       for(var g of this.finalCartPageProductArray){
        console.log('g :'+g);
         if(g.iteminfo[0].itemid ==  y.iteminfo[0].itemid){
           console.log(g.iteminfo[0].itemid)
           checkExist = true;
           break;
         }

       }
     console.log(checkExist);
       if(checkExist){
         console.log("Here we are");
         continue;
       }
         this.finalCartPageProductArray = this.finalCartPageProductArray.concat(thirdTempArray[0]);
         console.log(thirdTempArray[0]);

         console.log(this.finalCartPageProductArray);
      // If there is no 'y' object (product) in the final cart array, then we can append the product.

    }

    for(var y of this.finalCartPageProductArray){

      this.totalCartPrice = this.totalCartPrice + (y.cartitemamount * y.iteminfo[0].price);

      console.log("Cart Price");
      console.log(this.totalCartPrice);
    }

    console.log("Final cart Page Products");
    console.log(this.finalCartPageProductArray); // unique array of products with their product count
  }



  async addOne(i){
     if(this.finalCartPageProductArray[i].cartitemamount<10){
       if(this.invalidProductAmountMessage = "If you want to remove item, press 'remove items' below"){
         this.invalidProductAmountMessage = "";
       }
       this.finalCartPageProductArray[i].cartitemamount++;
       console.log(this.finalCartPageProductArray);

      this.totalCartPrice = this.totalCartPrice + this.finalCartPageProductArray[i].iteminfo[0].price;


       this.cartservices.addCartSessionVar(this.finalCartPageProductArray[i]);
       await this.sharedVars.sendCartRefresh();
       return;
     }
     this.invalidProductAmountMessage = "Cannot exceed 10 items per order.  Don't be greedy!";
  }

  async minusOne(i){
    if(this.finalCartPageProductArray[i].cartitemamount>1){
      if(this.invalidProductAmountMessage == "Cannot exceed 10 items per order.  Don't be greedy!"){
         this.invalidProductAmountMessage = "";
      }
      this.finalCartPageProductArray[i].cartitemamount--;

     this.totalCartPrice = this.totalCartPrice - this.finalCartPageProductArray[i].iteminfo[0].price;


      this.cartservices.deleteOneCartSessionVar(this.finalCartPageProductArray[i]);
      await this.sharedVars.sendCartRefresh();
      return;
    }
    this.invalidProductAmountMessage = "If you want to remove item, press 'remove items' below";
  }

  stockCheck(cartitem){
     this.inStockCheck = false;
      if(cartitem.iteminfo[0].currentitemstock>0){
        this.inStockCheck="Yes"
      }

      return this.inStockCheck;
  }
//    this.totalCartPrice = this.totalCartPrice + cartitem.iteminfo[0].price * cartitem.cartitemamount;

  priceCheck(cartitem){

     return cartitem.iteminfo[0].price * cartitem.cartitemamount;

  }


  async removeItems(ind){
    if(this.invalidProductAmountMessage){
      this.invalidProductAmountMessage = "";
    }
      await this.cartservices.deleteCartItemComplete(this.finalCartPageProductArray[ind]);
      await this.sharedVars.sendCartRefresh();
      this.firstCycle();
  }

  async saveCarts(){//code to save user carts for later //must do this for all callbacks. (link to backend works as of 6/7/2020)
    this.userInfo = await this.user.getSessionStorage();
    console.log(this.userInfo);
    if(this.userInfo==undefined){
      console.log("User not logged in.  Needs to sign in")
      this.openDialog();
      return;

    }
     await this.cartservices.saveEntireCart([this.finalCartPageProductArray,this.userInfo], this.showCartSavedSuccess.bind(this))
     await this.cartservices.deleteEntireCartInSessions();
     await this.sharedVars.sendCartRefresh();
     this.firstCycle();
  }
  //submits the cart info to the order page to verify the order
  async submitThisCart(){

    this.userInfo = await this.user.getSessionStorage();
    console.log(this.userInfo);
    if(this.userInfo==undefined){
      console.log("User not logged in.  Needs to sign in")
      this.openDialog();
      return;
    }

    this.router.navigateByUrl('/orderSubmitPage');

  }

  openDialog(){
    const dialogRef = this.dialog.open(WarningdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.openLoginSignup(); //after user gets out of the dialog box, this calls the function that opens the signin component.
    });
  }

  openLoginSignup(){
     var tempPrevRoute = this.router.url;
    try{
        this.modalRef = this.modalService.show(LoginsignupmodalComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: '',
        containerClass: '',
        animated: false
    });
    console.log('open modalRef mid');
    this.modalReferenceService.passModalRefObj(this.modalRef,tempPrevRoute, function(){
      console.log('Here the ref has been sent')
    });

  }
  catch(err){
    console.log('open modalRef error');
    console.log(err);
   }

  }

  showCartSavedSuccess(res, err){
    console.log("Cart Appears to be Saved");
    console.log(res);
  }

}
