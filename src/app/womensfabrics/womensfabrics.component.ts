import { Component, OnInit } from '@angular/core';
import {LandingpageserviceService} from '../landingpageservice.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-womensfabrics',
  templateUrl: './womensfabrics.component.html',
  styleUrls: ['./womensfabrics.component.css'],
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
export class WomensfabricsComponent implements OnInit {
//getWomensClothes()
  constructor(private landingpageservice : LandingpageserviceService) { }

  womensitems : any
  womensarray: any
//setTimeout(function(){ alert("Hello"); }, 3000);
  ngOnInit() {

    try{

    this.landingpageservice.
        getWomensClothes()
        .subscribe((data : any) =>{

          console.log('Here is the Womens fabrics data!')
          console.log(data)
          this.womensitems = data;

          //var i;
         //Fisher-Yates shuffle
         try{
         var shuffleArray = Array.from(this.womensitems);
         this.womensarray = this.shuffleArray(shuffleArray)
         console.log('this.womensarray');
         console.log(this.womensarray);
          }

          catch(e){
            console.log('Error!');
            console.log(e);
          }

        });

        }
      catch(err){
        console.log("What is the error?");
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
