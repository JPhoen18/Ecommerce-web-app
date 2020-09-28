import { Component, OnInit } from '@angular/core';
import {LandingpageserviceService} from '../landingpageservice.service';
import { TimelineMax } from 'gsap';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
//private landingpageservice : LandingpageserviceService
  currentUrl!: any;
  menu = new TimelineMax({paused:true, reversed:true});

  constructor(private landingpageservice : LandingpageserviceService) { }
  //constructor() { }

  ngOnInit() {
  //prev had code for retrieving pop items
   this.mainPageSummary();

  }

  mainPageSummary(){
    let summarytween = this.menu.fromTo("#mainimage",{opacity: 0}, {opacity: 1, delay: 2, duration:1})
                                .fromTo("#search-bar-div",{opacity: 0}, {opacity: 1, delay: 3, duration:1});
    summarytween.play();
  }

}
