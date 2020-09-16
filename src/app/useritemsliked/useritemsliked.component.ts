import { Component, OnInit } from '@angular/core';
import {UsercredsService} from '../usercreds.service';
import {UsercartserviceService} from '../usercartservice.service';
import {UserorderserviceService} from '../userorderservice.service';
import {SharedvarsService} from '../sharedvars.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-useritemsliked',
  templateUrl: './useritemsliked.component.html',
  styleUrls: ['./useritemsliked.component.css'],
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

export class UseritemslikedComponent implements OnInit {

  itemslikedarray : any
  username : any

  constructor(private orderservice: UserorderserviceService, private cred: UsercredsService,
    private cartservice: UsercartserviceService, private sharedvars : SharedvarsService) { }

  async ngOnInit() {

    var usersInfoNeeds = await JSON.parse(this.cred.getSessionStorage());
    console.log('usersInfo');
    console.log(usersInfoNeeds);
    console.log(usersInfoNeeds.id);
    this.username = usersInfoNeeds.firstname;
    var itemslikedinfo = await this.orderservice.getItemsLiked(usersInfoNeeds.id)
      .subscribe((res: any) =>{

          if(res){
          console.log('itemsliked array');
          console.log(res);
          this.itemslikedarray = res;
          return res;
                }

         else{
            console.log('Nothing here at the moment');
             }
      });

  }

  async addToCart(itemliked){
    await this.cartservice.setCartSessionVar(itemliked, 1);
    await this.sharedvars.sendCartRefresh();

  }

}
