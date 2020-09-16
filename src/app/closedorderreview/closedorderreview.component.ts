import { Component, OnInit } from '@angular/core';
import {UserorderserviceService} from '../userorderservice.service';
import {UsercredsService} from '../usercreds.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-closedorderreview',
  templateUrl: './closedorderreview.component.html',
  styleUrls: ['./closedorderreview.component.css'],
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

export class ClosedorderreviewComponent implements OnInit {

  singleItemArray : any
  everyOrderArray : any
  finalOrderPageProductArray : any
  incr: any
  hasarrived: any

  constructor(private orderserice: UserorderserviceService, private cred: UsercredsService) { }

  async ngOnInit()  {

    var usersInfo = await JSON.parse(this.cred.getSessionStorage());
    console.log('usersInfo');
    console.log(usersInfo.id);
    var sentinfo = await this.orderserice.getEveryOrder(usersInfo.id)
      .subscribe( async(res: any) =>{
          console.log('back with the user orders info');
          console.log(res);
          this.singleItemArray = res[0];
          this.everyOrderArray = res[1];

          console.log(this.singleItemArray);
          console.log(this.everyOrderArray);

          //added code to group items together instead of one by one -- 6/22/2020

          // Added code to offer a display of unique items instead of the same items over/over again 6/11/2020
          console.log(this.singleItemArray);
          for(var x of this.singleItemArray){
            console.log(x);
            var cartPageCopyArray = this.singleItemArray.slice();
               var temparray = await cartPageCopyArray.filter(res => res.orderid == x.orderid);
               var othertemp = await temparray.filter(res => res.compobjinfo.itemid == x.compobjinfo.itemid);

               console.log(othertemp);
               x.cartitemamount = othertemp.length;
               console.log(x.cartitemamount);
// Part one of fixing the filtering code -- 6/12/2020
          }

          console.log(this.singleItemArray); //this is correct


          var secondtemparray;
          this.finalOrderPageProductArray = [1];

      // This is the code to create an array with only unique products (filtered) with their item counts
      //** This works as of 6/3/2020 **
          for(var y of this.singleItemArray){
          //   console.log(y);
             var checkExist = false;
             //secondtemparray = this.singleCartItemArray.slice();
            // var thirdTempArray = secondtemparray.filter(res => res.compobjinfo.itemid == y.compobjinfo.itemid );

             if(this.finalOrderPageProductArray[0]==1){
               this.finalOrderPageProductArray[0] = y;//thirdTempArray[0];
               continue;
             }

             for(var g of this.finalOrderPageProductArray){
               if(g.compobjinfo.itemid ==  y.compobjinfo.itemid && g.orderid == y.orderid){

                 checkExist = true;
                 break;

               }
             }

             if(checkExist){
               continue;
             }
               this.finalOrderPageProductArray = this.finalOrderPageProductArray.concat(y);
            // If there is no 'y' object (product) in the final cart array, then we can append the product.

          }
          console.log(this.finalOrderPageProductArray);

          return res;

      })

  }

  setNumber(){
     this.incr = 0;
     console.log('the incrementor is: ');
     console.log(this.incr);
  }

  incSetNumber(){
     this.incr++;
  }

   // function called by the template to check for if order eta dates are greater than the the current date - still pending
  compareEtaDates(etadate){

    console.log('order date: ');
    var etaDATE = new Date(etadate);
    console.log(etaDATE);
    console.log(new Date());

    if(etaDATE < new Date()){
       this.hasarrived = true;
       console.log(this.hasarrived);
    }
    else{
       this.hasarrived = false;
       console.log(this.hasarrived);
    }

  }


}
