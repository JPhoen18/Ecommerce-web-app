import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
import {UsercredsService} from '../../usercreds.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSuccessMessage:boolean;
  serverErrorMessages:string;
  confirmationMessage:string;
  userCheck: boolean;
  newUser = {
             firstname : '',
             lastname : '',
             email : '',
             password : '',


           }

  constructor(private usercred : UsercredsService, private location: Location  ) { }

  ngOnInit(){
    this.location.replaceState('');
  }

  neweruser(res, err){
    //appears the scope in this cb function is different, so therefore this is not the same this for gb vars
    if(res){
      console.log('response from user creation');
      console.log(res);
      if(res.token){

        console.log(this.userCheck)
        this.userCheck = true;
        this.confirmationMessage = "New User successfully created, please login";
        console.log(this.confirmationMessage);
        this.newUser = {
                   firstname : '',
                   lastname : '',
                   email : '',
                   password : '',


                 }
      }

      else{
        this.userCheck = false;
        this.confirmationMessage = res.message;
        console.log(this.confirmationMessage);
        this.newUser = {
                   firstname : '',
                   lastname : '',
                   email : '',
                   password : '',


                 }
      }
      //this.confirmationMessage = "New User successfully created, please login";
       }
  }



   onSubmit(form:  NgForm){
    console.log('newUser')
      console.log(this.newUser)
        this.usercred.sendNewUser(this.newUser,this.neweruser.bind(this));
}
}
