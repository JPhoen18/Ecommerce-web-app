

var gender;
var pool;

async function getGenderClothes(gen){ // 1/20/20 This function seems to work, but I cannot make continue statement
  //work and cannot return the info to the frontend.  Work on this on 1/21/20

  var completeClothesArray = [1];
  var fabricsArray;
  var clothesarray;

//  console.log('Here are ' + gender + ' fabrics!');

  clothesarray = gen.rows;
//  console.log(clothesarray);

  var tempva = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM fabrics WHERE gender=$1',[gender])
  .then(async (res) => {
  //  console.log(gender + "fabrics");
  //  console.log(res);
    fabricsArray = res.rows;
        for(var obj of fabricsArray){

          var iteminfo;
          var imgurl;
          var fabricsinfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.clothesid])
          .then((res) => {
    //           console.log("Here is the item info!");
    //           console.log(res);
               iteminfo = res.rows;
          });
          //can prob consolidate this into one long promise chain
          await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.clothesid])
          .then((res) => {
      //         console.log("Here is the item info!");
      //         console.log(res);
               imgurl = res.rows;
               fabricsinfo = {'fabrics-info':obj, 'iteminfo':iteminfo, 'itemimage':imgurl}
      //         console.log("Here is the fabrics chain");
      //         console.log(fabricsinfo);

               if (completeClothesArray[0] === 1){
                   completeClothesArray[0] = fabricsinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
           //  if(imageArray[0] !== 1){
             completeClothesArray = completeClothesArray.concat(fabricsinfo);

          });

          }

    //  console.log('completeClothesArray');
     // console.log(completeClothesArray);
  })
  .then(() => {
    client.release();
   console.log('completewomensClothesArray');
  console.log(completeClothesArray);
   return completeClothesArray;

  })
});

  return tempva;


}

async function getGenderFabrics(gend, pol, callback){
 gender = gend;
 pool = pol;
 var finalobj;

//console.log(gender)
//console.log("Connected Success!")
let section = 'clothes';

try {
    pool.connect()
       //.then(() => console.log("Connected Success!"))
       .then((client) => {client.query('SELECT * FROM item WHERE itemcategory=$1',[section]) //1. query every mens fabric
       .then(getGenderClothes)
       .then((obj) =>{
  //     console.log("sending needed "+ gender +" info back");
  //       console.log(obj);
         ///finalobj = obj;
           //return obj;//resp.json(obj);
           callback(obj);
          client.release();
             })
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

module.exports.getGenderFabrics = getGenderFabrics;
