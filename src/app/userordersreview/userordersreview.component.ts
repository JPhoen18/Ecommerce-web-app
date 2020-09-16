import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {UsercredsService} from '../usercreds.service';

@Component({
  selector: 'app-userordersreview',
  templateUrl: './userordersreview.component.html',
  styleUrls: ['./userordersreview.component.css']
})
export class UserordersreviewComponent implements OnInit {

  userName: any
  currentUrl : any

  constructor(private usercredserv: UsercredsService) { }

async ngOnInit() {

    var userinfo = await JSON.parse(this.usercredserv.getSessionStorage());
    console.log(userinfo);
    this.userName =userinfo.firstname;
    console.log(this.userName);
    }

}
