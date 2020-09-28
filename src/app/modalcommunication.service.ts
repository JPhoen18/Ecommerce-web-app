import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalcommunicationService {

  //vars
  modalRefObj!: any;

  //BehaviorSubjects
  private modalReference = new BehaviorSubject(this.modalRefObj);

  //Observables
  currentModalRefObj = this.modalReference.asObservable();


  constructor() { }

  passModalRefObj(refModal, tempRoute, func){
  if(refModal){
    this.modalReference.next({refModal, tempRoute});
    console.log("Needed for the modal to exit");
    console.log(this.modalReference.getValue());
    func();
  }
 }

}
