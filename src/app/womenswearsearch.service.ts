import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WomenswearsearchService {

  uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }

 getEveryWomenFabricItem(){
    var womenspagecheck = true;
     try{
        return this.http.get(`/ecommerceapp/getMainPageWomensClothes/${womenspagecheck}`);
      }
     catch(err){
     console.log('uh-oh no womens ');
     console.log(err);
      }

 }

}
