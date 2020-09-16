
async function getAllBooks(pool, func){ // 1/20/20 This function seems to work, but I cannot make continue statement
  //work and cannot return the info to the frontend.  Work on this on 1/21/20
 console.log("In the book section now!")

  var completeBookArray = [1];
  var bookArray;//var fabricsArray;
  //var gemsarray; //var clothesarray;
var tempBookArray = await pool.connect()
  .then((client) => { return client.query('SELECT * FROM books')
  .then(async (res) => {
    console.log('all the book pieces')
    console.log(res);
    bookArray = res.rows;
        for(var obj of bookArray){

          var iteminfo;
          var imgurl;
          var bookinfo;

          await pool.query('SELECT * FROM item WHERE itemid=$1',[obj.bookid])
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


            await pool.query('SELECT * FROM itemsecondimage WHERE itemsecondimageid=$1',[obj.bookid])
            .then((res) => {
                 console.log("Here is the item info!");
                 console.log(res);
                 seconditemimage = res.rows;
                 });

             await pool.query('SELECT * FROM itemthirdimage WHERE itemthirdimageid=$1',[obj.bookid])
             .then((res) => {
                console.log("Here is the item info!");
                console.log(res);
                thirditemimage = res.rows;
              });

             await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.bookid])
               .then((res) => {
                  console.log("Here is the item info!");
                  console.log(res);
                  imgurl = res.rows;   ////

                  bookinfo = {'bookinfo':obj, 'iteminfo':iteminfo, 'itemimage':imgurl, 'itemsecondimage':seconditemimage, 'itemthirdimage':thirditemimage}

               console.log("Here is the art chain");
               console.log(bookinfo);

               if (completeBookArray[0] === 1){
                   completeBookArray[0] = bookinfo;
                   return; //used here to break out of a function , similar to the continue statement.
                 }
           //  if(imageArray[0] !== 1){
             completeBookArray = completeBookArray.concat(bookinfo);

           });


       }

  })
  .then(() => {
   console.log('completeBookArray');
  console.log(completeBookArray);
  func(completeBookArray);
  client.release();

  })

});

}

module.exports.getAllBooks = getAllBooks;
