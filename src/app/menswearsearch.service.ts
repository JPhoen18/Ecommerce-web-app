import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MenswearsearchService {

  uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }

 getEveryMenFabricItem(){
    var menspagecheck = true;
     try{
        return this.http.get(`${this.uri}/ecommerceapp/getMainPageMensClothes/${menspagecheck}`);
      }
     catch(err){
     console.log('uh-oh no mens ');
     console.log(err);
      }

 }


}
