import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductpageserviceService {

  //vars
  productRefObj : any

  //BehaviorSubjects
  private productReference = new BehaviorSubject(this.productRefObj);

  //Observables
  currentProductRefObj = this.productReference.asObservable();


  constructor() { }

  passProductRefObj(ref, funct){

  if(ref){
    this.productReference.next(ref);
    console.log("Needed to display the product page");
    console.log(this.productReference.getValue());
    funct();
  }
 }

 //set the product information so that upon a page refresh, the product info is available.
 setProduct(product){
   try{
   console.log("Here I am placing the product in local storage");
   console.log(product);
   sessionStorage.setItem('singlepageproduct', JSON.stringify(product));
     }
    catch(err){
      console.log('err with setting a single product')
      console.log(err)
    }
 }

//retrieving the set product
 getProduct(){
   try{//return sessionStorage.getItem('userdata');

   return JSON.parse(sessionStorage.getItem('singlepageproduct'));
     }
    catch(err){
      console.log('err with getting a single product')
      console.log(err)
    }
 }

}
