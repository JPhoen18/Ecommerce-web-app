import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserorderserviceService {

uri = 'http://10.0.0.191:4000'
//userIDNeeded : any

  constructor(private http: HttpClient) { }

  getEveryOrder(ids){
    //JSON.stringify(user);
    console.log(ids)
    var userIDNeeded = ids;

    try{
       return this.http.get(`${this.uri}/ecommerceapp/everyOrderNeeded/${userIDNeeded}`);
    }
    catch(err){
      console.log('uh-oh a no go');
      console.log(err);
    }

  }


  getEverySavedCart(ids){
    //JSON.stringify(user);
    console.log(ids)
    var useridcart = ids;

    try{
       return this.http.get(`${this.uri}/ecommerceapp/everySavedCartNeeded/${useridcart}`);
    }
    catch(err){
      console.log('uh-oh a no go');
      console.log(err);
    }

  }


  getItemsLiked(ids){
    //JSON.stringify(user);
    console.log(ids)
    var getitemsid = ids;

    try{
       return this.http.get(`${this.uri}/ecommerceapp/everyItemLiked/${getitemsid}`);
    }
    catch(err){
      console.log('uh-oh a no go');
      console.log(err);
    }

  }



}
