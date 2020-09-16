
async function getAllArt(pool, func){ // 1/20/20 This function seems to work, but I cannot make continue statement
  //work and cannot return the info to the frontend.  Work on this on 1/21/20
 console.log("In the art section now!")

  var completeArtArray = [1];
  var paintingArray;//var fabricsArray;
  //var gemsarray; //var clothesarray;
var tempArtArray = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM art')
  .then(async (res) => {
    console.log('all the art pieces')
    console.log(res);
    paintingArray = res.rows;
        for(var obj of paintingArray){

          var iteminfo;
          var imgurl;
          var artinfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.artid])
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


            await pool.query('SELECT * FROM itemsecondimage WHERE itemsecondimageid=$1',[obj.artid])
            .then((res) => {
                 console.log("Here is the item info!");
                 console.log(res);
                 seconditemimage = res.rows;
                 });

             await pool.query('SELECT * FROM itemthirdimage WHERE itemthirdimageid=$1',[obj.artid])
             .then((res) => {
                console.log("Here is the item info!");
                console.log(res);
                thirditemimage = res.rows;
              });

             await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.artid])
               .then((res) => {
                  console.log("Here is the item info!");
                  console.log(res);
                  imgurl = res.rows;   ////

                  artinfo = {'artinfo':obj, 'iteminfo':iteminfo, 'itemimage':imgurl, 'itemsecondimage':seconditemimage, 'itemthirdimage':thirditemimage}

               console.log("Here is the art chain");
               console.log(artinfo);

               if (completeArtArray[0] === 1){
                   completeArtArray[0] = artinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
           //  if(imageArray[0] !== 1){
             completeArtArray = completeArtArray.concat(artinfo);

           });


       }

  })
  .then(() => {
   console.log('completeArtArray');
  console.log(completeArtArray);
  func(completeArtArray);
  client.release();

  })

});

}

module.exports.getAllArt = getAllArt;
