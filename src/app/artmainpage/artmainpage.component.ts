// must add artist as a category and filter option 6/30/2020
import { Component, OnInit } from '@angular/core';
import {FetchartService} from '../fetchart.service';
import { Router } from '@angular/router';
import {ProductpageserviceService} from '../productpageservice.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-artmainpage',
  templateUrl: './artmainpage.component.html',
  styleUrls: ['./artmainpage.component.css'],
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
export class ArtmainpageComponent implements OnInit {



    //showNature: any;
    //showAbstract: any;
    //showBotanical: any;
    //showChildren: any;
    //showFineArt: any;

    artitemarray!: any; //copy of orig mens fabrics array
    artcategoryvar!:any;//heading of each section

    onlyNatureArray!: any;
    onlyAbstractArray!: any;
    onlyBotanicalArray!: any;
    onlyChildrenArray!: any;
    onlyFineArtArray!: any;
    itemNameObj: any = {"nature painting":this.onlyNatureArray, "abstract painting":this.onlyAbstractArray, "botanical painting":this.onlyBotanicalArray, "childrens painting":this.onlyChildrenArray,
     "fine art painting":this.onlyFineArtArray};

    itemdisparray!: any;
    overallFilterArray!: any  //array to store each filtered array for the purposes of filtering by the above categories.

    // following 3 variables represent the mat-select options
    medium!: any;
    dimension!: any;
    price!: any;
    artist!: any;

    checkEvery!: any;
    //@Output()
    //selectionChange: EventEmitter<MatSelectChange>
    //Event emitted when the selected value has been changed by the user.


      constructor(private fetchallart: FetchartService, private productpageservice: ProductpageserviceService, private router: Router ) { }

      ngOnInit()  {
        this.fetchallart.getArtPage()
            .subscribe((res) =>{
               this.artitemarray = res;
               this.overallFilterArray = this.artitemarray.slice();
               this.makeeveryitemappear();
               console.log('all art');
               console.log(this.artitemarray);
               console.log(this.artitemarray[2]);


        })
      }

      //function used to filter the results given by the side-panel
      async filterResults(){ // ** function called every time the select options changes
        console.log("I am here in the filter results method");
        var applyFiltersArray = this.overallFilterArray.slice();
        console.log(applyFiltersArray);
        this.checkEvery = !this.medium && !this.dimension && !this.price && this.artist;
        console.log(this.checkEvery);

        //console.log(applyFiltersArray);

        //check for the existence of each select variable
// left off 6/30/2020 11:30 am
         if(this.medium){
           console.log(this.medium);
           applyFiltersArray = await applyFiltersArray.filter(item => item.artinfo.medium==this.medium);
           console.log(applyFiltersArray);
         };
           if(this.dimension){
             console.log(this.dimension)
             applyFiltersArray = await applyFiltersArray.filter(item => item.artinfo.dimensions==this.dimension);
             console.log(applyFiltersArray);
           };
           if(this.artist){
             console.log(this.artist)
             applyFiltersArray = await applyFiltersArray.filter(item => item.iteminfo[0].itemcreator==this.artist);
             console.log(applyFiltersArray);
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
          console.log(sendarray);
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
                   console.log(array_appended);
                   continue;

                }
                array_appended = array_appended.concat(x);
                console.log(array_appended);
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

            const tempmensarray = this.artitemarray.slice();
            const itemcategoryarray = await tempmensarray.filter(item => item.iteminfo[0].itemsubcategory == itemstring);
            console.log(itemcategoryarray);
            let itemNameArray = Object.keys(this.itemNameObj);

            for(var x of itemNameArray){
                if (x == itemstring){
                      this.itemNameObj[itemstring] = itemcategoryarray; // this sets the corresponding itenNameObj entry to the subcategory array just created.
              }
            }

            console.log(this.itemNameObj);
            this.checkEvery = !this.medium && !this.dimension && !this.price && !this.artist;
            this.overallFilterArray = itemcategoryarray.slice(); //saving the filtered array for the select panel filters(price, composition)
            if(!this.checkEvery){
              this.filterResults();
              return;
          }
            this.viewEveryItem(itemcategoryarray);

          }
  /// left off edit here 10:51 am 6/26/2020


        async toProductPage(product){
           console.log(product);

           await this.productpageservice.passProductRefObj(product, function(){
             console.log('Here the ref has been sent')
           });

           await this.productpageservice.setProduct(product);

           this.router.navigateByUrl('singleproductpage');

        }



      makeeveryitemappear(){
            this.artcategoryvar = "Every Art Piece Item In-Stock";
            //this.viewEveryItem(this.mensitemarray);
            this.checkEvery = !this.dimension && !this.medium && !this.price && !this.artist;
            this.overallFilterArray = this.artitemarray.slice();
            if(!this.checkEvery){
              this.filterResults();
              return
          }
         this.viewEveryItem(this.artitemarray);

        }

      makeNaturePaintingAppear(){
        this.artcategoryvar = "Nature Paintings";
        this.viewCategory("nature painting");

      }


      makeAbstractPaintingAppear(){
        this.artcategoryvar = "Abstract Paintings";
        this.viewCategory("abstract painting");

      }

      makeBotanicalPaintingAppear(){
        this.artcategoryvar = "Botanical Paintings";
        this.viewCategory("botanical painting");

      }


      makeChildrenPaintingAppear(){
        this.artcategoryvar = "Children's Paintings";
        this.viewCategory("childrens painting");

      }

      makeFineArtPaintingAppear(){
        this.artcategoryvar = "Fine Art Paintings";
        this.viewCategory("fine art painting");

      }


}
