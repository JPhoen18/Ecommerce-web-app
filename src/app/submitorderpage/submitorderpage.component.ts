import {NgForm} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {UsercartserviceService} from '../usercartservice.service';
import {UsercredsService} from '../usercreds.service';
import {SharedvarsService} from '../sharedvars.service';
import { Router } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-submitorderpage',
  templateUrl: './submitorderpage.component.html',
  styleUrls: ['./submitorderpage.component.css'],
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
export class SubmitorderpageComponent implements OnInit {
  fullUser: any
  cartToOrder: any
  finalOrderPageProductArray: any
  totalOrderPrice: any
  shippingCostPrice: any
  taxCost: any
  cardHolderInfo: any
  userAccountInfo: any
  userBillingAddress: any
  newAddress: any
  confirmationCardMessage: any
  confirmationAddressMessage: any
  invalidOrderAmountMessage: any

  orderInfo = {
    newcardnumber: '',
    newmailstreetaddress: '',
    newmailcitystate: '',
    newmailzipcode: ''
  }

  saveCardForClear: any

  // booleans
  editCardBool: any = false;
  constructor(private router : Router, private cartservices: UsercartserviceService,
     private user: UsercredsService, private sharedVars: SharedvarsService) { }

  ngOnInit(): void {
       this.fillPage();
  }

async fillPage(){

     var user = JSON.parse(this.user.getSessionStorage());
     await this.user.accessEntireUserAccount(user.email)
        .subscribe((res : any) =>{
          console.log(res)
          this.cardHolderInfo = res.currentcreditcard.slice(12,16);
          this.userBillingAddress = res.homeaddress.split(",");
          console.log(this.userBillingAddress);
          this.fullUser = res;

        });

     this.cartToOrder = this.cartservices.getCartSessionVar();
     console.log(this.cartToOrder);

     if(this.cartToOrder==null){
       console.log("empty cart");
       this.invalidOrderAmountMessage = "Your Order Has Been Submitted";
       return;
     }

     if(this.cartToOrder.length==undefined){
       console.log("empty cart");
       this.invalidOrderAmountMessage = "Your Order Has Been Submitted";
       return;
     }
     //code copied from shopping cart page to display the order information


     console.log(this.cartToOrder);

     for(var x of this.cartToOrder){
       console.log(x);
       var orderPageCopyArray = this.cartToOrder.slice();

          var temporderarray = await orderPageCopyArray.filter(res => res.iteminfo[0].itemid == x.iteminfo[0].itemid);

          x.cartitemamount = temporderarray.length;

     }

     console.log(this.cartToOrder);

     var secondtemporderarray;
     //var idchecker = secondtemparray[0].iteminfo[0].itemid;
     //var nextidchecker;
     this.finalOrderPageProductArray = [1];

 // This is the code to create an array with only unique products (filtered) with their item counts
 //** This works as of 6/3/2020 **
     for(var y of this.cartToOrder){
        console.log(y);
        var checkExist = false;
        secondtemporderarray = this.cartToOrder.slice();
       // var thirdTempArray = secondtemparray.filter(res => res.iteminfo[0].itemid == y.iteminfo[0].itemid);

         var thirdTempOrderArray = await secondtemporderarray.filter(res => res.iteminfo[0].itemid == y.iteminfo[0].itemid);

        if(this.finalOrderPageProductArray[0]==1){
          console.log("stuck here")
          this.finalOrderPageProductArray[0] = thirdTempOrderArray[0];
          continue;
        }

        for(var g of this.finalOrderPageProductArray){
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
          this.finalOrderPageProductArray = this.finalOrderPageProductArray.concat(thirdTempOrderArray[0]);
          console.log(thirdTempOrderArray[0]);

          console.log(this.finalOrderPageProductArray);
       // If there is no 'y' object (product) in the final cart array, then we can append the product.

     }
     this.totalOrderPrice = 0;
     this.shippingCostPrice = 15;
     this.taxCost = 3;
     for(var y of this.finalOrderPageProductArray){

       this.totalOrderPrice = this.totalOrderPrice + (y.cartitemamount * y.iteminfo[0].price);

       console.log("Cart Price");
       console.log(this.totalOrderPrice);
     }

     console.log("Final cart Page Products");
     console.log(this.finalOrderPageProductArray);
     console.log(this.totalOrderPrice);


     /// code copied from shopping cart page to display the order information

  }

  priceCheck(cartitem){
    console.log(cartitem)
     return cartitem.iteminfo[0].price * cartitem.cartitemamount;

  }

  removeItems(){
    this.router.navigateByUrl('/toCartPage');
  }

  editUserCard(){
    if(this.editCardBool){
     this.editCardBool = false;
     this.orderInfo.newcardnumber = '';
     console.log(this.editCardBool);
     return;
     }
    if(!this.editCardBool){
      this.editCardBool = true;
     }
  }

  editShippingAddress(){
    if(this.newAddress){
     this.newAddress = false;
     this.orderInfo.newmailstreetaddress = '';
     this.orderInfo.newmailcitystate = '';
     this.orderInfo.newmailzipcode = '';
     console.log(this.newAddress);
     return;
     }
    if(!this.newAddress){
      this.newAddress = true;
     }
  }

  async onSubmit(form: NgForm){
    this.confirmationCardMessage = "Your Card Was Saved Successfully";
    console.log(this.orderInfo.newcardnumber);
    //this.saveCardForClear = this.orderInfo.newcardnumber;
    this.cardHolderInfo = this.orderInfo.newcardnumber.slice(12,16);
    await this.user.setUserOrderCard(this.orderInfo.newcardnumber, this.fullUser.userid, this.saveCardResponse.bind(this));

  }

  saveCardResponse(res, err){
    console.log("It looks like it worked well!");
    console.log(res);
    this.fillPage();
    this.orderInfo.newcardnumber = '';
  }
//newmailstreetaddress: '',
//newmailcitystate: '',
//newmailzipcode:
  async onSubmitAddress(form: NgForm){
    this.confirmationAddressMessage = "Your Address was saved successfully";
   console.log(this.orderInfo);
   var newAddressForDatabase = this.orderInfo.newmailstreetaddress +','+this.orderInfo.newmailcitystate+','+this.orderInfo.newmailzipcode
   this.userBillingAddress = newAddressForDatabase.split(",");
   console.log(this.userBillingAddress);
   await this.user.setUserOrderAddress(newAddressForDatabase, this.fullUser.userid, this.saveAddressResponse.bind(this));

   //From here, save the address through server, set the variable for the screen update, and then call the function
  }

  saveAddressResponse(res, err){
    console.log("It looks like the save address worked well!");
    this.fillPage();
    console.log(res);
  }

  async submitOrderButton(){
    await this.user.submitUserOrderFinal([this.finalOrderPageProductArray, this.fullUser], this.showOrderSuccess.bind(this));
    await this.cartservices.deleteEntireCartInSessions();
    this.fillPage();
    await this.sharedVars.sendCartRefresh();

  }

  showOrderSuccess(res, err){
    console.log("Order appears to be submitted");
    console.log(res);
  }

}
