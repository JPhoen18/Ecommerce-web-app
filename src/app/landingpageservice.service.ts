import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LandingpageserviceService {

  uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }


  getMostPopular() {
     return this.http.get(`${this.uri}/ecommerceapp/getPopItems`);
   }

   getMensClothes() {
     try{
      return this.http.get(`${this.uri}/ecommerceapp/getMensClothes`);
    }
    catch(err){
      console.log("no fabrics found");
      console.log(err);
    }
    }


    getWomensClothes() {


      try{  //setTimeout(function(){ alert("Hello"); }, 3000);
       return this.http.get(`${this.uri}/ecommerceapp/getWomensClothes`);
     }
     catch(err){
       console.log("no womens fabrics found");
       console.log(err);
     }

}

     getJewelry() {

       try{  //setTimeout(function(){ alert("Hello"); }, 3000);
        return this.http.get(`${this.uri}/ecommerceapp/getJewelry`);
      }
      catch(err){
        console.log("no jewelry found");
        console.log(err);
      }

}

getPopArt() {

  try{  //setTimeout(function(){ alert("Hello"); }, 3000);
   return this.http.get(`${this.uri}/ecommerceapp/getPopArt`);
 }
 catch(err){
   console.log("no jewelry found");
   console.log(err);
 }

}

getPopBooks() {

  try{  //setTimeout(function(){ alert("Hello"); }, 3000);
   return this.http.get(`${this.uri}/ecommerceapp/getPopBooks`);
 }
 catch(err){
   console.log("no books found");
   console.log(err);
 }

}



}
