

var gender;
var pool;
var entiremainjewelrypage;
//var completeClothesArray;

async function getByGender(gen){ // 1/20/20 This function seems to work, but I cannot make continue statement
  //work and cannot return the info to the frontend.  Work on this on 1/21/20
 console.log("In the jewelry section now!")

  var completeJewelryArray = [1];
  var jewelryArray;//var fabricsArray;
  var gemsarray; //var clothesarray;

 console.log('Here are ' + gender + ' fabrics!');

  gemsarray = gen.rows;
 console.log(gemsarray);
var tempva = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM jewelry WHERE gender=$1',[gender])
  .then(async (res) => {
    console.log(gender + "fabrics");
    console.log(res);
    jewelryArray = res.rows;
        for(var obj of jewelryArray){

          var iteminfo;
          var imgurl;
          var jewelryinfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.jewelryid])
          .then((res) => {
               console.log("Here is the item info!");
               console.log(res);
               iteminfo = res.rows;

            });

          //can prob consolidate this into one long promise chain

          //check if this module is being called from the main mens clothing page.  If so, obtain all the stored images

                    //check if this module is being called from the main mens clothing page.  If so, obtain all the stored images
                    // - prepare the vars needed for the
          var seconditemimage;
          var thirditemimage;
          var checksecondthird;
          console.log('entiremainjewelrypage');
          console.log(entiremainjewelrypage);
          //return;
          if(entiremainjewelrypage){

            await pool.query('SELECT * FROM itemsecondimage WHERE itemsecondimageid=$1',[obj.jewelryid])
            .then((res) => {
                 console.log("Here is the item info!");
                 console.log(res);
                 seconditemimage = res.rows;
                 });

             await pool.query('SELECT * FROM itemthirdimage WHERE itemthirdimageid=$1',[obj.jewelryid])
             .then((res) => {
                console.log("Here is the item info!");
                console.log(res);
                thirditemimage = res.rows;
              });

              checksecondthird = true;

          }

          await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.jewelryid])
          .then((res) => {
               console.log("Here is the item info!");
               console.log(res);
               imgurl = res.rows;   ////
               jewelryinfo = {'jewelryinfo':obj, 'iteminfo':iteminfo, 'itemimage':imgurl}
               if(checksecondthird){
               jewelryinfo = {'jewelryinfo':obj, 'iteminfo':iteminfo, 'itemimage':imgurl, 'itemsecondimage':seconditemimage, 'itemthirdimage':thirditemimage}
             }
               console.log("Here is the fabrics chain");
               console.log(jewelryinfo);

               if (completeJewelryArray[0] === 1){
                   completeJewelryArray[0] = jewelryinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
           //  if(imageArray[0] !== 1){
             completeJewelryArray = completeJewelryArray.concat(jewelryinfo);

           });


       }

  })
  .then(() => {
    client.release();
   console.log('completeJewelryArray');
  console.log(completeJewelryArray);
   return completeJewelryArray;

  })

});

// 2/5/2020 solved the issue by returning the first query from the above pool chain.  on 2/6/20 do the same
// for the other modules. In addition the issue with the server not resending the images from database was
// fixed because I make sure to check in the clients every time.  I will reuse this in the other modules.

console.log('completeArray');
console.log(tempva);



return tempva;




}

async function getJewelryByGender(gend, pol, mainjewelrypage, callback){
 gender = gend;
 pool = pol;
 var finalobj;



console.log(mainjewelrypage);

entiremainjewelrypage = mainjewelrypage;
console.log('Jewelry mens main page');
console.log(entiremainjewelrypage);


console.log(gender)
//console.log("Connected Success!")
let section = 'jewelry';
//client.release();
console.log(pool);
try {
    pool.connect()
      // .then((client) => console.log("Connected Success!"))
       .then((client) => { client.query('SELECT * FROM item WHERE itemcategory=$1',[section]) //1. query every mens fabric
       .then(getByGender)
       .then((res) =>{
       console.log("sending needed "+ gender +" info back");
         console.log(res);
         ///finalobj = obj;
           //return obj;//resp.json(obj);
           //client.release();
           callback(res);
            client.release();
         });
       });



                                                                //2. send array of mens fabric to function to...
                                                                        //  cycle through each item's itemid val and for..
                                                                        //  each itemid value, query fabrics table for the respective..
                                                                        // mens clothing, using conditionals.
                                                                        //3. in the special function above, create an array
                                                                        //containing fabric tables info for male clothing along with
                                                                        //the respective mens clothing info in a 2d array.

      }
  catch(err){
     console.log("What went wrong");
     console.log(err);
  }


}

module.exports.getJewelryByGender = getJewelryByGender;
