import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {UsercredsService} from '../usercreds.service';

@Component({
  selector: 'app-edituseraccount',
  templateUrl: './edituseraccount.component.html',
  styleUrls: ['./edituseraccount.component.css']
})

export class EdituseraccountComponent implements OnInit {

  editWarningMessage : any

  modifyuser =  {
   email :'',
   mobilenumber :'',
   password :'',
   firstname :'',
   lastname :'',
   homeaddress :'',
   currentcreditcard :'',
   userid : ''   }


  constructor(private usercred: UsercredsService) { }

  async ngOnInit() {
       var tempEmail = await JSON.parse(this.usercred.getSessionStorage());
       console.log(tempEmail.email);

       var userneeded = await this.usercred.accessEntireUserAccount(tempEmail.email) //need this to display the user info in the form
          .subscribe((res : any) =>{

                    console.log(res);
                    this.modifyuser.email = res.email;
                    this.modifyuser.mobilenumber = res.mobilenumber;
                    this.modifyuser.firstname = res.firstname;
                    this.modifyuser.lastname = res.lastname;
                    this.modifyuser.homeaddress = res.homeaddress;
                    this.modifyuser.currentcreditcard = res.currentcreditcard;
                    this.modifyuser.userid = res.userid;
                    return res;

           });

       //console.log(userneeded);
  }

  async onEditUser(){
    this.editWarningMessage = '';
    var newsessionvar;
    console.log(this.modifyuser);
    var newUpdateUser = await this.usercred.updateCurrentUserAccount(this.modifyuser)
      .subscribe((res : any) => {
              console.log(res);
              this.usercred.deleteToken();
              this.usercred.setToken(res.token);
              console.log(res.rows[0]);
              newsessionvar = res.rows[0];
              this.usercred.deleteSessionStorage();
              this.usercred.setSessionStorage({ id: newsessionvar.userid, firstname: newsessionvar.firstname, lastname: newsessionvar.lastname, email: newsessionvar.email });
//{ id: decoded.userId, firstname:rows[0].firstname, lastname:rows[0].lastname, email:rows[0].email};
              if(res.message){
                this.editWarningMessage = res.message;
              }
      });

  }

}
