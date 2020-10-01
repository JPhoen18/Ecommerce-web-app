import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchthebooksService {

  uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }

  getBooksPage(){

      try{
       return this.http.get(`/ecommerceapp/getMainPageBooks`);
      }
      catch(err){
        console.log(err);
      }
  }

}
