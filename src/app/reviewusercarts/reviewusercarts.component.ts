import { Component, OnInit } from '@angular/core';
import {UserorderserviceService} from '../userorderservice.service';
import {UsercredsService} from '../usercreds.service';
import {UsercartserviceService} from '../usercartservice.service';
import { Router } from '@angular/router';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-reviewusercarts',
  templateUrl: './reviewusercarts.component.html',
  styleUrls: ['./reviewusercarts.component.css'],
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
export class ReviewusercartsComponent implements OnInit {

  singleCartItemArray : any
  everyUserCartArray : any
  finalCartPageProductArray: any
  incr: any
  userID: any
  checkForUnique: any

  constructor(private cartservice: UsercartserviceService, private userorderserice: UserorderserviceService,
    private usercred: UsercredsService, private cartservices: UsercartserviceService, private router : Router) { }

  async ngOnInit()  {

    this.cartDisplay();

  }

 async cartDisplay(){

    var usersInfo = await JSON.parse(this.usercred.getSessionStorage());
    console.log('usersInfo');
    console.log(usersInfo.id);
    this.userID = usersInfo.id;
    this.checkForUnique = true;
    var sentinfo = await this.userorderserice.getEverySavedCart(usersInfo.id)
      .subscribe( async(res: any) =>{
          console.log('back with the user orders info');
          console.log(res);
          this.singleCartItemArray = res[0];
          this.everyUserCartArray = res[1];

          console.log(this.singleCartItemArray);
          console.log(this.everyUserCartArray);

          // Added code to offer a display of unique items instead of the same items over/over again 6/11/2020
          console.log(this.singleCartItemArray);
          for(var x of this.singleCartItemArray){
            console.log(x);
            var cartPageCopyArray = this.singleCartItemArray.slice();
               var temparray = await cartPageCopyArray.filter(res => res.cartid == x.cartid);
               var othertemp = await temparray.filter(res => res.iteminfo[0].itemid == x.iteminfo[0].itemid);

               console.log(othertemp);
               x.cartitemamount = othertemp.length;
               console.log(x.cartitemamount);
// Part one of fixing the filtering code -- 6/12/2020
          }

          console.log(this.singleCartItemArray); //this is correct


          var secondtemparray;
          this.finalCartPageProductArray = [1];

      // This is the code to create an array with only unique products (filtered) with their item counts
      //** This works as of 6/3/2020 **
          for(var y of this.singleCartItemArray){
          //   console.log(y);
             var checkExist = false;
             //secondtemparray = this.singleCartItemArray.slice();
            // var thirdTempArray = secondtemparray.filter(res => res.compobjinfo.itemid == y.compobjinfo.itemid );

             if(this.finalCartPageProductArray[0]==1){
               this.finalCartPageProductArray[0] = y;//thirdTempArray[0];
               continue;
             }

             for(var g of this.finalCartPageProductArray){
               if(g.iteminfo[0].itemid ==  y.iteminfo[0].itemid && g.cartid == y.cartid){

                 checkExist = true;
                 break;

               }
             }

             if(checkExist){
               continue;
             }
               this.finalCartPageProductArray = this.finalCartPageProductArray.concat(y);
            // If there is no 'y' object (product) in the final cart array, then we can append the product.

          }
          console.log(this.finalCartPageProductArray);

          return res;
      })





  }

  initNumber(){
     this.incr = 0;
//     console.log('the incrementor is: ');
//     console.log(this.incr);
  }

  incNumber(){
    //console.log(this.singleCartItemArray[index-1].cartitemid);
     this.incr++;

  }

  async deleteCart(cartID){
    try{
    console.log(cartID);
  }
  catch(err){
    console.log(err);
  }

    await this.cartservice.deleteEntireCart(cartID, this.userID, this.deleteCartSuccess.bind(this));
    await this.cartservice.deleteEntireCart(cartID, this.userID, this.deleteCartSuccess.bind(this));
    //send the cartid for deletion to the server to delete the cart
  }

  deleteCartSuccess(res, err){
    console.log("Cart Has Been Deleted");
    console.log(res);
    this.cartDisplay();
  }

async sendToCartPage(cartID){
    console.log(cartID);
    var tempCartForCartPage = this.singleCartItemArray.slice();
    var tempTempCart = await tempCartForCartPage.filter(res => res.cartid == cartID);
    console.log(tempTempCart);
    await this.cartservices.editCartfromCartPage(tempTempCart);
    this.router.navigateByUrl('/toCartPage');

  }

async sendToOrderPage(cartID){
  console.log(cartID);
  var tempCartForOrderPage = this.singleCartItemArray.slice();
  var tempTempCart = await tempCartForOrderPage.filter(res => res.cartid == cartID);
  console.log(tempTempCart);
  await this.cartservices.editCartfromCartPage(tempTempCart);
  this.router.navigateByUrl('/orderSubmitPage');
  }

}
