import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FetchartService {

  uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }

  getArtPage(){

      try{
       return this.http.get(`${this.uri}/ecommerceapp/getMainPageArt`);
      }
      catch(err){
        console.log(err);
      }
  }

}
