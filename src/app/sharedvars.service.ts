import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedvarsService {

  private subject = new Subject<any>();
  private newsubject = new Subject<any>();
  private routesubject = new Subject<any>();
  private routerefresh = new Subject<any>();
  private backgroundrefresh = new Subject<any>();

  constructor() { }

  sendClickEvent() {  //used to send the request to run another components functions.
  this.subject.next();
   }

  sendCartRefresh(){
    this.newsubject.next();
  };

  sendRouteRefresh(route){
    this.routesubject.next(route);
  };

  sendBackHomeRefresh(num){
     num = num + 1;
     console.log(num);
    this.routerefresh.next(num);
  };

   getClickEvent(): Observable<any>{ // this is used to obtain the desire to run a function by the component with the function
   return this.subject.asObservable();
   }

   getCartRefreshEvent(): Observable<any>{
     return this.newsubject.asObservable();
   }

   getRouteRefreshEvent(): Observable<any>{
     return this.routesubject.asObservable();
   }

   getBackHomeEvent(): Observable<any>{
     return this.routerefresh.asObservable();
   }
}
