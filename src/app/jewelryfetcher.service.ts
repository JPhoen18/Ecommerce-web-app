import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JewelryfetcherService {

  uri = 'http://10.0.0.191:4000'


  constructor(private http: HttpClient) { }

  getMensJewelryPage(){

      var gender = 'M'
      var pagecheck = true;

      var jewelrypack = JSON.stringify({gender, pagecheck});
      console.log(jewelrypack)
      try{
       return this.http.get(`${this.uri}/ecommerceapp/getMainPageJewelry/${jewelrypack}`);
      }
      catch(err){
        console.log(err);
      }
  }

  getWomensJewelryPage(){

      var gender = 'F'
      var pagecheck = true;

      var jewelrypack = JSON.stringify({gender, pagecheck});
      try{
       return this.http.get(`${this.uri}/ecommerceapp/getMainPageJewelry/${jewelrypack}`);
      }
      catch(err){
        console.log(err);
      }
  }

}
