import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import  { LoginsignupmodalComponent } from './loginsignupmodal/loginsignupmodal.component';
import {ModalcommunicationService} from './modalcommunication.service';
import {UsercredsService} from './usercreds.service';
import {SharedvarsService} from './sharedvars.service';
import {UsercartserviceService} from './usercartservice.service';
 import {Location} from '@angular/common';
 import { TimelineMax } from 'gsap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ecommerce-web-app';
  router: any
  currentUrl : any;
  modalRef: MDBModalRef;
  userloggedin: any;
  userinfofrontpage: any;
  response: any;
  cartAmount: any;
  tempPrevRoute : any;
  menu = new TimelineMax({paused:true, reversed:true});

  constructor(private modalService: MDBModalService, private modalReferenceService: ModalcommunicationService,
              private usercred: UsercredsService, private sharedService : SharedvarsService,
               private cartservices: UsercartserviceService, private _router : Router, private location: Location ) {
                this.router = _router.url;
                this.tempPrevRoute = this._router.url;
                this.sharedService.getClickEvent().subscribe(() =>{
                  this.onuserlogin(); //basically will call this function whenever the user logs in, to make sure that the homepage
                  //displays user information.
                });

                this.sharedService.getCartRefreshEvent().subscribe(() =>{
                   console.log("checked");
                   this.checkCartNow();
                });

                this.sharedService.getRouteRefreshEvent().subscribe((res) =>{
                  console.log(res);

//                   console.log("route changed to root");
                   this.toMainPage(res);
                });


              }

  ngOnInit() {

      this.onuserlogin();
      this.mainPageAnimation();
  }

  mainPageAnimation(){
    let tween = this.menu.fromTo("#mainpagepar",{opacity: 0}, {opacity: 1, delay: 1.5, duration:1})
                          .fromTo("#cloth",{opacity: 0}, {opacity: 1, delay: 0.5, duration: 0.5})
                          .fromTo("#jewel",{opacity: 0}, {opacity: 1, duration: 0.5})
                          .fromTo("#art",{opacity: 0}, {opacity: 1, duration: 0.5})
                          .fromTo("#furniture",{opacity: 0}, {opacity: 1, duration: 0.5})
                          .fromTo("#books",{opacity: 0}, {opacity: 1, duration: 0.5})
                          .fromTo(".divider",{opacity: 0}, {opacity: 1, stagger: 0.5, duration: 0.5})
;
    tween.play();

  }

  async checkCartNow(){
    try{
      var getCartLength = this.cartservices.getCartSize();
      if(getCartLength!=null){
        console.log(getCartLength);
        this.cartAmount = getCartLength;
        return;
      }
      this.cartAmount = 0;
    }
    catch(err){
      console.log(err);
    }
  }

  async onuserlogin(){

     this.checkCartNow();

     var gettoken = this.usercred.getToken(); //check for json webtoken
  //   var tokenconstruct = { token : gettoken};
  //   console.log(tokenconstruct);
     console.log('gettoken');
     console.log(typeof(gettoken));
     var tokenvalid = this.usercred.isLoggedIn(); //check for token that is not expired

     if(tokenvalid){  //if there is a token and the token has not expired.
        this.userloggedin = tokenvalid;
        this.response = this.usercred.getSessionStorage(); //check for user info stored in session storage
     //var
             if(this.response){ //check for user session storage information
               console.log('here is the userstuff');
               console.log(this.response);
               this.userinfofrontpage = JSON.parse(this.response);
               console.log(this.userinfofrontpage);

             }
             else{

                await this.usercred.sendTokenForId({ token : gettoken}, this.idCheckerTwo.bind(this));

             }
           }
           else{
             console.log('token not here yet, must login');
           }
   }


   async idCheckerTwo(res, err){
        if(res.id){
          console.log('Here is the user id sent after verifying the token is correct');
          console.log(res.id);
          await this.usercred.setSessionStorage(res);
          this.response = this.usercred.getSessionStorage()
          console.log(this.response);
          this.userinfofrontpage = JSON.parse(this.response);
          console.log(this.userinfofrontpage);


        }}

   async openModal(){
     // after creating a service, send the current url to the service and subscribe to the url in the
     // loginsignupmodal.  use the sharedvarsservice.
     console.log(this._router.url);
     console.log(this.tempPrevRoute);
     //await this.sharedService.sendRouteRefresh(this._router.url);
     //var tempPrevRoute = this._router.url;
     document.getElementById("openmodaldimmer").style.display="block";
    console.log('open modalRef beginning');
    try{
        this.modalRef = this.modalService.show(LoginsignupmodalComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: '',
        containerClass: '',
        animated: false
    });
    console.log('open modalRef mid');
    await this.modalReferenceService.passModalRefObj(this.modalRef, this._router.url, function(){
      console.log('Here the ref has been sent')

    });


  }
  catch(err){
    console.log('open modalRef error');
    console.log(err);
  }
window.scrollTo(0, 0)
this.location.replaceState('');

    //this is where i send the modal reference to the service that communicates between app.component and modal component
  }


  toMainPageSeparate(){
    this._router.navigateByUrl('');
  }


  async toMainPage(prevRoute){// track what route came before.  This way, can reload the page at the correct router
    //ex.: login at route sends user back to route, login at singleproductpage sends user back to singele product page.
  //  console.log(prevRoute);
    // window.location.reload();
    console.log(prevRoute);

    this._router.navigateByUrl(prevRoute)
      .then(() => {
        window.location.reload();
      });



    //await this._router.navigateByUrl('');

  //}
  //await this._router.navigateByUrl(prevRoute);
  //window.location.reload();
    //this.$route.reload(); // this fixed the issue of the routes not being available until page reloaded isse - 7/12/2020
    //console.log(this._router.url);

  }

  toUserAccount(){
    this._router.navigateByUrl('/useraccount');
  }

  toCartMainPage(){
    this._router.navigateByUrl('toCartPage');
  }

  toCart(){
    this._router.navigateByUrl('/toCartPage');
  }

  onLogout(){
    this.usercred.deleteToken();
    this.usercred.deleteSessionStorage();
    this.userloggedin = null;
    this.userinfofrontpage = null;
    this._router.navigateByUrl('');

    //this._router.navigateByUrl('/');

  }
}
