import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UsercredsService} from '../../usercreds.service';
import {SharedvarsService} from '../../sharedvars.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  user = { email : '',
           password : ''
        }
  loginMessage : string;
  signedinmessage : string;
  constructor(private usercred : UsercredsService, private sharedVars : SharedvarsService, private router : Router,
  private location: Location ) { }

  async ngOnInit(){
     this.location.replaceState('');
    console.log(this.router.url);


    //await this.sharedVars.sendBackHomeRefresh(0);
    //   this.sharedVars.getBackHomeEvent().subscribe(async(res) =>{
//    try{

//      if(res){
//       console.log("check the num");
//       console.log(res);
//       if(res === 1){
//         this.router.navigateByUrl('');
//         return;
//       }
//     };

//       await this.sharedVars.sendBackHomeRefresh(0);
//       return;
//    });
//  }
//  catch(err){
//    console.log(err);
//  }


  }


  onSubmit(form:  NgForm){

    console.log('Credentials');
    console.log(this.user);
    this.usercred.sendLogin(this.user, this.tokenChecker.bind(this));

   }

   tokenChecker(res, err){
     if(res){
       if(res.token){
       console.log('Here is the token we need to get in');
       console.log(res); // this shoud be the token we need.  from here send to sessions/ nearby storage
       this.usercred.setToken(res.token);
       this.signedinmessage = "Signed in successfully";
       this.usercred.sendTokenForId(res, this.idChecker.bind(this));
       this.loginMessage ='';
       //this.router.navigateByUrl('');
            }
       else if(res.message){
        console.log('Here is the message');
        console.log(res); // this shoud be the token we need
        this.loginMessage = res.message;
             }
     }

   }

   async idChecker(res, err){
        if(res.id){
          console.log('Here is the user id sent after verifying the token is correct');
          console.log(res.id);
          await this.usercred.setSessionStorage(res);
          await this.sharedVars.sendClickEvent();




          }
   }




}
