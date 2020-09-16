import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FetchfurnitureService {

 uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }

  getFurniturePage(){

      try{
       return this.http.get(`${this.uri}/ecommerceapp/getMainPageFurniture`);
      }
      catch(err){
        console.log(err);
      }
  }

}
