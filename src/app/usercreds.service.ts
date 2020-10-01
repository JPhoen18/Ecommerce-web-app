import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsercredsService {

  uri = 'http://10.0.0.191:4000'

  userobj : any
  loginuser: any
  loginUserToken : any

  constructor(private http: HttpClient) { }

/////////////////


  sendNewUser(res, fn) {
    console.log('This is the user info to register');

    this.userobj = res;
    console.log(this.userobj);

    try{
    this.http.post(`/ecommerceapp/createUser`, this.userobj)
              .subscribe(function(res){
                console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                console.log("Yay sending the user worked");
                fn(res);
              });
      }
     catch(err){
       console.log('What is the err?');
       console.log(err);
     }

   }


   sendLogin(res, resfn){
     this.loginuser = res;

     try{
     this.http.post(`/ecommerceapp/loginUser`, this.loginuser)
               .subscribe(function(res){
                 console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                 console.log("Yay sending the login user worked");
                 resfn(res);
               });
       }
      catch(err){
        console.log('What is the err?');
        console.log(err);
      }

   }


   sendTokenForId(res, resfn){
     this.loginUserToken = res;

     try{
     this.http.post(`/ecommerceapp/sendTokenGetId`, this.loginUserToken, {headers: {'authorization':'Bearer '+ this.loginUserToken.token + ''}})
               .subscribe(function(res){
                 console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                 console.log("Yay sending the login user worked");
                 resfn(res);
               });
       }
      catch(err){
        console.log('What is the err?');
        console.log(err);
      }

   }

   setSessionStorage(sessionid){
     try{
     console.log("Here I am placing the user id for the session")
     console.log(sessionid)
     sessionStorage.setItem('userdata', JSON.stringify(sessionid));
       }
      catch(err){
        console.log('err with the sessions var')
        console.log(err)
      }
   }

   setUserOrderCard(carddigits, userid, fn){
     console.log(carddigits);
     console.log(userid);


     try{
     this.http.post(`/ecommerceapp/editCardInfo`, {carddigits, userid})
               .subscribe(function(res){
                 console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                 console.log("Yay saving the card information worked");
                 fn(res);
               });
       }
      catch(err){
        console.log('What is the err?');
        console.log(err);
      }

   }

   setUserOrderAddress(address, userid, fnc){
     console.log(address);


     try{
     this.http.post(`/ecommerceapp/editShippingAddressInfo`, {address, userid})
               .subscribe(function(res){
                 console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                 console.log("Yay saving the shipping address information worked");
                 fnc(res);
               });
       }
      catch(err){
        console.log('What is the err?');
        console.log(err);
      }

   }

   submitUserOrderFinal(orderUser, callback){
     console.log(orderUser);
     try{

     this.http.post(`/ecommerceapp/submitCurrentOrder`, orderUser)
               .subscribe(function(res){
                 console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
                 console.log("Yay user cart saved.");
                 callback(res);
               });
       }

      catch(err){
        console.log('What is the err?');
        console.log(err);
      }

   }

   getSessionStorage(){
     return sessionStorage.getItem('userdata');
   }

   deleteSessionStorage(){
      sessionStorage.removeItem('userdata');
   }

   setToken(token){
    localStorage.setItem('token', token);
    //This is set once the user is returned to the frontend
    }

    getToken(){
     return localStorage.getItem('token');
    }

     deleteToken(){
        localStorage.removeItem('token');
      }

      getUserPayload(){
    var token = this.getToken();
    if(token){
       var userPayload = atob(token.split('.')[1]);
       return JSON.parse(userPayload);
    }
    else
        return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
        return userPayload.exp > Date.now() / 1000;
    else
        return false;
  }
//'/ecommerceapp/modifyUser'
  accessEntireUserAccount(email){
      console.log(email);
      var getteremail = email;
      try{
       return this.http.get(`/ecommerceapp/retrieveCurrentUser/${getteremail}`);
      }
      catch(err){
        console.log(err);
      }
  }

  updateCurrentUserAccount(user){
      console.log(user);
      var currentUser = JSON.stringify(user);
      try{
       return this.http.get(`/ecommerceapp/updateCurrentUser/${currentUser}`);
      }
      catch(err){
        console.log(err);
      }
  }

 }
