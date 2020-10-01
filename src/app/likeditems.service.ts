import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LikeditemsService {

uri = 'http://10.0.0.191:4000'

  constructor(private http: HttpClient) { }

    recordAsLiked(itemid, userid, resfn){
     console.log(itemid + " " + userid);
     var likedItemPack = {itemid, userid};
      try{
       this.http.post(`/ecommerceapp/recordItemsLiked`, likedItemPack)
       .subscribe(function(res){
         console.log(res); //this is the token from the database, this works as of  four /nineteen/ twothousandtwenty
         console.log("Yay sending the liked item worked");
         resfn(res);
       });
      }
      catch(err){
        console.log(err);
      }

    }
}
