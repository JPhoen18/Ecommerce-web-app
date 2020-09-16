

var gender = ['M', 'F'];
var pool;

async function getGenderArray(){ // 1/20/20 This function seems to work, but I cannot make continue statement
  //work and cannot return the info to the frontend.  Work on this on 1/21/20

  var completeJewelryArray = [1];
  var mensJewelryArray = [1];
  var womensJewelryArray = [1];
  var gemArray;
  //var clothesarray;

  //console.log('Here are ' + gender + ' fabrics!');

  //clothesarray = gen.rows;
  //console.log(clothesarray);

for (var gend of gender){
  var mensemptyarray = [1];
  var womensemptyarray = [1];
//   console.log(gend);
if (gend === 'M'){
  womensJewelryArray = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM jewelry WHERE gender=$1',[gend])
  .then(async (res) => {
  //  console.log(gend + "jewelry");
  //  console.log(res);
    gemArray = res.rows;
        for(var obj of gemArray){

          var iteminfo;
          var imgurl;
          var geminfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.jewelryid])
          .then((res) => {
    //           console.log("Here is the item info!");
    //           console.log(res);
               iteminfo = res.rows;
          });
          //can prob consolidate this into one long promise chain
          await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.jewelryid])
          .then((res) => {
      //         console.log("Here is the item info!");
      //         console.log(res);
               imgurl = res.rows;
               jewelryinfo = {'jewelry-info':obj, 'iteminfo':iteminfo, 'itemimage':imgurl}
      //         console.log("Here is the jewelry chain");
      //         console.log(jewelryinfo);

               if (mensemptyarray[0] === 1){
                   mensemptyarray[0] = jewelryinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
               mensemptyarray = mensemptyarray.concat(jewelryinfo);

              // if (gend === 'M'){
              // if (mensJewelryArray[0] === 1){
            //       mensJewelryArray[0] = jewelryinfo;
            //       return; //used here to break out of a function , similar to the continue statement.
            //     }
           //  if(imageArray[0] !== 1){
          //   mensJewelryArray = mensJewelryArray.concat(jewelryinfo);
          //     }

          //     if (gend === 'F'){
          //     if (womensJewelryArray[0] === 1){
          //         womensJewelryArray[0] = jewelryinfo;
          //         return; //used here to break out of a function , similar to the continue statement.
          //       }
           //  if(imageArray[0] !== 1){
          //   womensJewelryArray = womensJewelryArray.concat(jewelryinfo);

            });
          }
      })
      .then(() => {
        client.release();
       console.log('completeJewelryMensArray');
      console.log(mensemptyarray);
       return mensemptyarray;

      })
  });
}

if (gend === 'F'){
mensJewelryArray = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM jewelry WHERE gender=$1',[gend])
  .then(async (res) => {
  //  console.log(gend + "jewelry");
  //  console.log(res);
    gemArray = res.rows;
        for(var obj of gemArray){

          var iteminfo;
          var imgurl;
          var geminfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.jewelryid])
          .then((res) => {
    //           console.log("Here is the item info!");
    //           console.log(res);
               iteminfo = res.rows;
          });
          //can prob consolidate this into one long promise chain
          await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.jewelryid])
          .then((res) => {
      //         console.log("Here is the item info!");
      //         console.log(res);
               imgurl = res.rows;
               jewelryinfo = {'jewelry-info':obj, 'iteminfo':iteminfo, 'itemimage':imgurl}
      //         console.log("Here is the jewelry chain");
      //         console.log(jewelryinfo);

               if (womensemptyarray[0] === 1){
                   womensemptyarray[0] = jewelryinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
               womensemptyarray = womensemptyarray.concat(jewelryinfo);

              // if (gend === 'M'){
              // if (mensJewelryArray[0] === 1){
            //       mensJewelryArray[0] = jewelryinfo;
            //       return; //used here to break out of a function , similar to the continue statement.
            //     }
           //  if(imageArray[0] !== 1){
          //   mensJewelryArray = mensJewelryArray.concat(jewelryinfo);
          //     }

          //     if (gend === 'F'){
          //     if (womensJewelryArray[0] === 1){
          //         womensJewelryArray[0] = jewelryinfo;
          //         return; //used here to break out of a function , similar to the continue statement.
          //       }
           //  if(imageArray[0] !== 1){
          //   womensJewelryArray = womensJewelryArray.concat(jewelryinfo);

            });
          }
      })
      .then(() => {
        client.release();
       console.log('completeJewelryWomensArray');
      console.log(womensemptyarray);
       return womensemptyarray;

      })
  });
}
//  if(gend === 'F'){
  //  console.log('completeFemaleGemsArray');
  //  console.log(womensJewelryArray);
//   }

 // if(gend === 'M'){
  //  console.log('completeMaleGemsArray');
  //  console.log(mensJewelryArray);
  // }

}

  completeJewelryArray = [mensJewelryArray, womensJewelryArray];
  return completeJewelryArray;


}

async function getGenderJewelry(pol, callback){
 //gender = gend; //this will be an array of [m,f]
 pool = pol;
 var finalobj;

//console.log(gender)
//console.log("Connected Success!")
let section = 'Jewelry';

try {
    pool.connect()
       .then((client) => {getGenderArray()
       //.then(getGenderArray)
       .then((obj) =>{
  //     console.log("sending needed "+ gender +" info back");
  //       console.log(obj);
         ///finalobj = obj;
           //return obj;//resp.json(obj);
           client.release();
           callback(obj);
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

module.exports.getGenderJewelry = getGenderJewelry;
