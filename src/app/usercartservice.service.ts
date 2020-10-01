import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsercartserviceService {

  uri = 'http://10.0.0.191:4000';

  constructor(private http: HttpClient) { }

  //function to set a new cart variable if there is nothing, or append item if there is a variable
  setCartSessionVar(cartItem, itemcount){

try{
  var currentUserCart;

     if(!sessionStorage.getItem('sessionusercart')){

       currentUserCart = [1]

       for(var i=0; i<itemcount; i++){
             if(currentUserCart[0] == 1){
               currentUserCart[0] = cartItem;
               continue;
             }
          currentUserCart = currentUserCart.concat(cartItem);
       }

       console.log(currentUserCart);
       sessionStorage.setItem('sessionusercart', JSON.stringify(currentUserCart));
       return;
     }

     currentUserCart = JSON.parse(sessionStorage.getItem('sessionusercart'));

     console.log('currentUserCart from session storage');
     console.log(currentUserCart);

     for(var i=0; i<itemcount; i++){
        currentUserCart = currentUserCart.concat(cartItem);
     }

     console.log('New user cart');
     console.log(currentUserCart);
     sessionStorage.setItem('sessionusercart', JSON.stringify(currentUserCart))
  }

catch(err){
  console.log('Not working: '+err);
}

}

  getCartSessionVar(){
    try {
     return JSON.parse(sessionStorage.getItem('sessionusercart'));
    }
    catch(err){
      console.log(err);
    }
  }

  addCartSessionVar(newcartitem){
    var tempSessionCart = JSON.parse(sessionStorage.getItem('sessionusercart'));

    tempSessionCart = tempSessionCart.concat(newcartitem);

    console.log(tempSessionCart);
    sessionStorage.setItem('sessionusercart', JSON.stringify(tempSessionCart));

    };

   getCartSize(){
     var tempCart = JSON.parse(sessionStorage.getItem('sessionusercart'));
     if(tempCart!=null){
        return tempCart.length;
     }
     return "";

   }

    deleteOneCartSessionVar(deleteitem){  //deletes one item from, for ex., an orig quantity of 5 items
       var tempSessionCartForDelete = JSON.parse(sessionStorage.getItem('sessionusercart'));
    // temporarily adding code to accommodate two different types of item objects. Will come back and fix.

       for(var x in tempSessionCartForDelete){


           if(deleteitem.iteminfo[0].itemid == tempSessionCartForDelete[x].iteminfo[0].itemid){
               tempSessionCartForDelete.splice(x,1);
               break;
           }

        }

       console.log(tempSessionCartForDelete);
       sessionStorage.setItem('sessionusercart', JSON.stringify(tempSessionCartForDelete));

    };


    deleteCartItemComplete(totalitem){ //deletes every particular item from a cart
// fixing
      var tempSessionCartForDelete = JSON.parse(sessionStorage.getItem('sessionusercart'));

      for(var x in tempSessionCartForDelete){
          if(totalitem.iteminfo[0].itemid == tempSessionCartForDelete[x].iteminfo[0].itemid){
              tempSessionCartForDelete.splice(x,totalitem.cartitemamount);

          }

      }


      console.log(tempSessionCartForDelete);
      sessionStorage.setItem('sessionusercart', JSON.stringify(tempSessionCartForDelete));
    };

    deleteEntireCartInSessions(){//simply deletes the whole cart from session variable
       sessionStorage.removeItem('sessionusercart');
    }

    saveEntireCart(cartUser, refunc){
        console.log(cartUser);
        try{

        this.http.post(`/ecommerceapp/saveCurrentCart`, cartUser)
                  .subscribe(function(res){
                    console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                    console.log("Yay user cart saved.");
                    refunc(res);
                  });
          }

         catch(err){
           console.log('What is the err?');
           console.log(err);
         }
    };

    //deletes the selected carts from the user cart review page in user profile
    deleteEntireCart(cartID, userID, refunc){
        console.log(cartID);

        try{
        //for posting, parameter passed needs to always be in an object bracket.
        this.http.post(`/ecommerceapp/deleteCart`, {cartID, userID})
                  .subscribe(function(res){
                    console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                    console.log("Yay user cart deleted.");
                    refunc(res);
                  });
          }

         catch(err){
           console.log('What is the err?');
           console.log(err);
         }
    };

    editCartfromCartPage(editcart){
     console.log(editcart)
      if(sessionStorage.getItem('sessionusercart')){
          this.deleteEntireCartInSessions();
       }
      // check for an already existing cart. If there is a cart, save it and then set the new cart variable
       sessionStorage.setItem('sessionusercart', JSON.stringify(editcart));
    };

//    tempSessionCart.splice(index, 1, newcartitem);
//    console.log(tempSessionCart);
//    sessionStorage.setItem('sessionusercart', JSON.stringify(tempSessionCart))
//  }

}
