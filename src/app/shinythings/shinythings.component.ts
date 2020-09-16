import { Component, OnInit } from '@angular/core';
import {LandingpageserviceService} from '../landingpageservice.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-shinythings',
  templateUrl: './shinythings.component.html',
  styleUrls: ['./shinythings.component.css'],
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

export class ShinythingsComponent implements OnInit {

  constructor(private landingpageservice : LandingpageserviceService) { }
    mensJewelryArray : any;
    womensJewelryArray : any;
    currentUrl : any;
    mensJewelry : any;
    womensJewelry : any;

  ngOnInit() {


    try{
      this.landingpageservice.
          getJewelry()
          .subscribe((data : any) =>{
             console.log("Here is the womens and mens jewelry!");
             console.log(data); //this returns the jewelry information
             this.womensJewelry = data[0];
             this.mensJewelry = data[1];

             try{
             var shuffleArrayOne = Array.from(this.womensJewelry);
             var shuffleArrayTwo = Array.from(this.mensJewelry);

             this.womensJewelryArray = this.shuffleArray(shuffleArrayOne)
             console.log('this.womensJewelryArray');
             console.log(this.womensJewelryArray);

             this.mensJewelryArray = this.shuffleArray(shuffleArrayTwo)
             console.log('this.mensJewelryArray');
             console.log(this.mensJewelryArray);



              }

              catch(e){
                console.log('Error!');
                console.log(e);
              }
          })

    }

    catch(err){
      console.log("Here is the frontend jewelry error!");
      console.log(err);
    }

  }

  shuffleArray(array){

    for (var i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1) )

        const temp = array[i]


        array[i] = array[j]

        console.log('new i va')
        console.log(array[i])
        array[j] = temp
          console.log(array);
      };


    return array;

  }

}
