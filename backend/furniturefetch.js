
async function getAllFurniture(pool, func){ // 1/20/20 This function seems to work, but I cannot make continue statement
  //work and cannot return the info to the frontend.  Work on this on 1/21/20
 console.log("In the book section now!")

  var completeFurnitureArray = [1];
  var furnitureArray;//var fabricsArray;
  //var gemsarray; //var clothesarray;
var tempFurnitureArray = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM furniture')
  .then(async (res) => {
    console.log('all the furniture pieces')
    console.log(res);
    furnitureArray = res.rows;
        for(var obj of furnitureArray){

          var iteminfo;
          var imgurl;
          var furnitureinfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.furnitureid])
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
          //return;


            await pool.query('SELECT * FROM itemsecondimage WHERE itemsecondimageid=$1',[obj.furnitureid])
            .then((res) => {
                 console.log("Here is the item info!");
                 console.log(res);
                 seconditemimage = res.rows;
                 });

             await pool.query('SELECT * FROM itemthirdimage WHERE itemthirdimageid=$1',[obj.furnitureid])
             .then((res) => {
                console.log("Here is the item info!");
                console.log(res);
                thirditemimage = res.rows;
              });

             await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.furnitureid])
               .then((res) => {
                  console.log("Here is the item info!");
                  console.log(res);
                  imgurl = res.rows;   ////

                  furnitureinfo = {'furnitureinfo':obj, 'iteminfo':iteminfo, 'itemimage':imgurl, 'itemsecondimage':seconditemimage, 'itemthirdimage':thirditemimage}

               console.log("Here is the furniture chain");
               console.log(furnitureinfo);

               if (completeFurnitureArray[0] === 1){
                   completeFurnitureArray[0] = furnitureinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
           //  if(imageArray[0] !== 1){
             completeFurnitureArray = completeFurnitureArray.concat(furnitureinfo);

           });


       }

  })
  .then(() => {
   console.log('completeFurnitureArray');
  console.log(completeFurnitureArray);
  func(completeFurnitureArray);
  client.release();

  })

});

}

module.exports.getAllFurniture = getAllFurniture;
