import { Component, OnInit } from '@angular/core';
import {LandingpageserviceService} from '../landingpageservice.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';


@Component({
  selector: 'app-mensfabrics',
  templateUrl: './mensfabrics.component.html',
  styleUrls: ['./mensfabrics.component.css'],
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

export class MensfabricsComponent implements OnInit {

  constructor(private landingpageservice : LandingpageserviceService) { }

  mensitems : any
  mensarray: any

  ngOnInit() {

    try{

    this.landingpageservice.
        getMensClothes()
        .subscribe((data : any) =>{

          console.log('Here is the Mens fabrics data!')
          console.log(data)
          this.mensitems = data;

          //var i;
         //Fisher-Yates shuffle
         try{
         var shuffleArray = Array.from(this.mensitems);
         this.mensarray = this.shuffleArray(shuffleArray)
         console.log('this.mensarray');
         console.log(this.mensarray);
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
