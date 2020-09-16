import { Component, OnInit } from '@angular/core';
import {LandingpageserviceService} from '../landingpageservice.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-popitems',
  templateUrl: './popitems.component.html',
  styleUrls: ['./popitems.component.css'],
  animations: [
  trigger('listStagger', [
    transition('* <=> *',[
      query(':enter', //only defined elements being added, and where they are going from and to
      [
        style({opacity: 0, transform: 'translateY(-15px)'}),
        stagger('50ms',
        animate('550ms ease-out',
        style({ opacity: 1, transform: 'translateY(0px)'})))
      ], {optional: true }),
      query( ':leave', animate('50ms', style({ opacity: 0 })), {
        optional: true
    })
  ])
])

]
})
export class PopitemsComponent implements OnInit {

  popitems : any


  constructor(private landingpageservice : LandingpageserviceService) { }

  ngOnInit() {

    try{
    this.landingpageservice
        .getMostPopular()
        .subscribe((data : any) =>{

          console.log('Here is the getMostPopular data!')
          console.log(data) //** data works after database query 1/14/2020
          this.popitems = data;
        })
        }
      catch(err){
        console.log("What is the error?");
        console.log(err);
      }
  }



}
