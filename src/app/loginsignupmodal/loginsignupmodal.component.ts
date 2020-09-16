import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import {SharedvarsService} from '../sharedvars.service';
import {ModalcommunicationService} from '../modalcommunication.service';


@Component({
  selector: 'app-loginsignupmodal',
  templateUrl: './loginsignupmodal.component.html',
  styleUrls: ['./loginsignupmodal.component.css']
})
export class LoginsignupmodalComponent implements OnInit {
  componentName: any
  modalRef: MDBModalRef;
  tempRoutes: any;

  constructor(private modalRefObject: ModalcommunicationService, private _router : Router,
     private sharedVars : SharedvarsService ) { }

  ngOnInit() {



   this._router.navigateByUrl('/signin');
   this.componentName = 'LoginComponent'
  //  this._router.navigate([{ outlets: { modal: 'route' }}])  "[{outlets: {'modal': ['route']}}]"
  }

  changeOfRoute($event){
  console.log($event.constructor.name);
  this.componentName = $event.constructor.name;
  console.log(this.componentName);
  console.log(typeof(this.componentName));
}

async callFunctions(){
  this.modalRefObject.currentModalRefObj.subscribe(async(res) =>{
     console.log('Current ModalRefObj:');
     console.log(res);
     this.modalRef = res.refModal;
     this.tempRoutes = res.tempRoute;
     await this.modalRef.hide();
     //window.location.reload()
     await this.sharedVars.sendRouteRefresh(this.tempRoutes);
  });


  //this._router.navigateByUrl('/')
  //  .then(() => {
  //    window.location.reload();
  //  });

}

onLogout(){
  //this.resourceservice.deleteToken();
  //this._router.navigateByUrl('/signin');
}

}
