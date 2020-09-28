import { Component, OnInit } from '@angular/core';
import {MenswearsearchService} from '../menswearsearch.service';
import { Router } from '@angular/router';
import {ProductpageserviceService} from '../productpageservice.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-menswearpage',
  templateUrl: './menswearpage.component.html',
  styleUrls: ['./menswearpage.component.css'],
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
export class MenswearpageComponent implements OnInit {

showitem!: any;
showsweaters!: any;
showpants!: any;
showshorts!: any;
mensitemarray!: any; //copy of orig mens fabrics array
menscategoryvar!:any;//heading of each section

onlyshirtsarray!: any;
onlysweatersarray!: any;
onlypantsarray!: any;
onlyshortsarray!: any;
itemNameObj: any = {"shirt":this.onlyshirtsarray, "sweaters":this.onlysweatersarray, "pants":this.onlypantsarray, "shorts":this.onlyshortsarray};

itemdisparray!: any;
overallFilterArray!: any  //array to store each filtered array for the purposes of filtering by the above categories.

// following 5 variables represent the mat-select options
size!: any;
composition!: any;
price!: any;
style!: any;
fit!: any;

checkEvery!: any;
//@Output()
//selectionChange: EventEmitter<MatSelectChange>
//Event emitted when the selected value has been changed by the user.


  constructor(private mensitemservice: MenswearsearchService, private productpageservice: ProductpageserviceService, private router: Router ) { }

  ngOnInit()  {
    this.mensitemservice.getEveryMenFabricItem()
        .subscribe((res) =>{
           this.mensitemarray = res;
           this.overallFilterArray = this.mensitemarray.slice();
           this.makeeveryitemappear();
           console.log('mens clothing');
           console.log(this.mensitemarray);
           console.log(this.mensitemarray[2]);


    })
  }

  //function used to filter the results given by the side-panel
  async filterResults(){ // ** function called every time the select options changes
    console.log("I am here in the filter results method");
    var applyFiltersArray = this.overallFilterArray.slice();
    console.log(applyFiltersArray);
    //console.log(this.checkEvery);
    //var checkEvery = !this.size && !this.composition && !this.price && !this.style && !this.fit;
    //console.log(applyFiltersArray);

    //check for the existence of each select variable

     if(this.size){
       applyFiltersArray = await applyFiltersArray.filter(item => item.fabricsinfo.size==this.size);
     };
       if(this.composition){
         applyFiltersArray = await applyFiltersArray.filter(item => item.fabricsinfo.composition==this.composition);
       };
         if(this.price){
           console.log("checking the price");
           if(this.price=='LTH'){
            //svar tempfilter = applyFiltersArray;
            console.log("from low to high");
           applyFiltersArray = await applyFiltersArray.sort((itema, itemb) => (itema.iteminfo[0].price > itemb.iteminfo[0].price) ? 1 : -1);
             }
           if(this.price=='HTL'){
            applyFiltersArray = await applyFiltersArray.sort((itema, itemb) => (itema.iteminfo[0].price < itemb.iteminfo[0].price) ? 1 : -1);
             }
         };
           if(this.style){
              applyFiltersArray = await applyFiltersArray.filter(item => item.fabricsinfo.style==this.style);
           };
             if(this.fit){
              applyFiltersArray = await applyFiltersArray.filter(item => item.fabricsinfo.fit==this.fit);
             };
             this.checkEvery = !this.size && !this.composition && !this.price && !this.style && !this.fit;
    if(this.checkEvery){
      console.log("All selections undefined");
      this.viewEveryItem(this.overallFilterArray);
      return;
    }
    this.viewEveryItem(applyFiltersArray);
  }

  viewEveryItem(sendarray){ // this function takes every item and turns it into a 2D array with three items per row.

      var y = 0;
      var z = 0;
    //  var ultimatearray : [1];
      let ultimatearray:any[] = [1];
      var array_appended = [1];

      for(var x of sendarray){
         z++;
         console.log(z);
         console.log(y);

        if(y<=2){
          if(array_appended[0] == 1 && sendarray.length==z){
             array_appended[0] = x;
             y++;
             console.log(array_appended);
             ultimatearray = ultimatearray.concat([array_appended]);
             break;

          }
            if(array_appended[0] == 1){
               array_appended[0] = x;
               y++;
               continue;

            }
            array_appended = array_appended.concat(x);

            if(y<2 && sendarray.length==z){
              console.log('In the fin array concat function');
               ultimatearray = ultimatearray.concat([array_appended]);
              }

            if(y!=2){
              y++;
            continue;
                  }

           }

        if(y==2){
          console.log(array_appended);  //array of objects
              if(ultimatearray[0] == 1){
                 ultimatearray[0] = array_appended;
                 console.log(ultimatearray);
                 y = 0;
                 array_appended = [1];
                 continue;
              }


              ultimatearray = ultimatearray.concat([array_appended]);


              console.log(ultimatearray);
              y = 0;
              array_appended = [1];

             }




          }



          this.itemdisparray = ultimatearray;
          console.log('ultimatearray');
          console.log(z);
          console.log(sendarray.length);
          console.log(this.itemdisparray);

        }

    async viewCategory(itemstring){

        const tempmensarray = this.mensitemarray.slice();
        const itemcategoryarray = await tempmensarray.filter(item => item.iteminfo[0].itemsubcategory == itemstring);
        console.log(itemcategoryarray);
        let itemNameArray = Object.keys(this.itemNameObj);

        for(var x of itemNameArray){
            if (x == itemstring){
                  this.itemNameObj[itemstring] = itemcategoryarray; // this sets the corresponding itenNameObj entry to the subcategory array just created.
          }
        }

        console.log(this.itemNameObj);
        this.checkEvery = !this.size && !this.composition && !this.price && !this.style && !this.fit;
        this.overallFilterArray = itemcategoryarray.slice(); //saving the filtered array for the select panel filters(price, composition)
        if(!this.checkEvery){
          this.filterResults();
          return;
      }
        this.viewEveryItem(itemcategoryarray);

      }


    async viewSubCategory(subtype, type){

      console.log(type)
      const temparray = this.itemNameObj[type].slice();
      const othertemparray = await temparray.filter(item => item.fabricsinfo.style == subtype);
      console.log(othertemparray);  //send this var to a goba var to save for easy reference.
      this.checkEvery = !this.size && !this.composition && !this.price && !this.style && !this.fit;
      this.overallFilterArray = othertemparray.slice(); //saving the filtered array for the select panel filters(price, composition)
      if(!this.checkEvery){
        this.filterResults();
        return;
    }
      this.viewEveryItem(othertemparray);

    }

    async toProductPage(product){
       console.log(product);

       await this.productpageservice.passProductRefObj(product, function(){
         console.log('Here the ref has been sent')
       });

       await this.productpageservice.setProduct(product);

       this.router.navigateByUrl('singleproductpage');

    }



  makeeveryitemappear(){
        this.menscategoryvar = "Every Men's Item";
        //this.viewEveryItem(this.mensitemarray);
        this.checkEvery = !this.size && !this.composition && !this.price && !this.style && !this.fit;
        this.overallFilterArray = this.mensitemarray.slice();
        if(!this.checkEvery){
          this.filterResults();
          return
      }
     this.viewEveryItem(this.mensitemarray);

    }

   makeshirtsappear(){
     this.menscategoryvar = "Men's shirts";
     this.viewCategory("shirt")

    if(this.showitem){
     this.showitem = false;
    }

  else{
     this.showitem = true;
    }
  }

//@ every sub category method activated by the hidden subcat options//
  makecasualshirtsappear(){
    this.menscategoryvar = "Mens Casual shirts";
    this.viewSubCategory("casual", "shirt");

 }

 makeformalshirtsappear(){
   this.menscategoryvar = "Mens Formal shirts";
   this.viewSubCategory("formal", "shirt");
 }

 makecasualpantsappear(){
   this.menscategoryvar = "Mens Casual Pants";
   this.viewSubCategory("casual", "pants");

 }

 makeformalpantsappear(){
   this.menscategoryvar = "Mens Formal Pants";
   this.viewSubCategory("formal", "pants");
 }

 makecasualshortsappear(){
   this.menscategoryvar = "Mens Casual Shorts";
   this.viewSubCategory("casual", "shorts");

 }

 makeformalshortsappear(){
   this.menscategoryvar = "Mens Formal Shorts";
   this.viewSubCategory("formal", "shorts");
 }

 makecasualsweatersappear(){
   this.menscategoryvar = "Mens Casual Sweaters";
   this.viewSubCategory("casual", "sweaters");

 }

 makeformalsweatersappear(){
   this.menscategoryvar = "Mens Formal Sweaters";
   this.viewSubCategory("formal", "sweaters");
 }

 ///// end of subcat options

  makesweatersappear(){
    this.menscategoryvar = "Men's sweaters";
    this.viewCategory("sweaters")
    if(this.showsweaters){
     this.showsweaters = false;
    }

  else{
     this.showsweaters = true;
    }
  }

  makepantsappear(){
    this.menscategoryvar = "Men's pants";
    this.viewCategory("pants");
    if(this.showpants){
     this.showpants = false;
    }

  else{
     this.showpants = true;
    }
  }

  makeshortsappear(){
    this.menscategoryvar = "Men's shorts";
    this.viewCategory("shorts");
    if(this.showshorts){
     this.showshorts = false;
    }

  else{
     this.showshorts = true;
    }
  }

  makeunderwearappear(){
    this.menscategoryvar = "Men's underwear";
    this.viewCategory("underwear");

  }


  makesocksappear(){
    this.menscategoryvar = "Men's socks";
    this.viewCategory("socks");

  }

  makeswimwearappear(){
    this.menscategoryvar = "Men's swimwear";
    this.viewCategory("swimwear");

  }


  makesportswearappear(){
    this.menscategoryvar = "Men's sportswear";
    this.viewCategory("sportswear");

  }

}
