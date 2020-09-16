var pool;

async function getPicture(popobj){ //takes in the most popular pictures, queries database to get corresponding images
  //** 1/1/20 this function works
      imageArray = [1];
      //console.log(popobj.rows);
for(var obj of popobj.rows){ //  async.eachSeries(popobj.rows, async function(obj){  //  for(var obj of popobj.rows){
          var imgpackage = 1;
          //console.log("Check it out!");
          //  console.log(obj);
        //console.log(obj.itemid); ** this works
        const newpack = await pool.connect()
        .then((client) => { return client.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.itemid])
          .then((qobj) =>{

            imgpackage =  { 'url':qobj.rows[0], 'item':obj };
            console.log('book image imgpackage');
          console.log(imgpackage);

            client.release();
            return imgpackage;
                        //console.log(imgpackage);
          });
        });
          // **1/1 -- this works too
              if (imageArray[0] === 1){
                  imageArray[0] = newpack;
                  continue;
                }
          //  if(imageArray[0] !== 1){
            imageArray = imageArray.concat(newpack);
          //}
        }

      //console.log(imageArray);
      //const newImageArray = await Promise.all(imageArray);
      console.log('book image array');
      console.log(imageArray);
      return imageArray;
};


  function queryBookTitle(pol, callback){
  pool = pol;
  book = 'books';

try {
   pool.connect()
     //.then(() => console.log("Connected Success!"))
     .then( (client) => { client.query('SELECT * FROM item WHERE itemcategory=$1',[book])

  //    .then(resobj => console.log(resobj.rows))
      .then(getPicture)
      .then((obj) =>{
      console.log("sending needed book info back");
        console.log(obj);
        //imageArray = obj;
        client.release();
          callback(obj);
        })
      });

    //     .finally(() => {
      // Make sure to release the client before any error handling,

    //  pool.end();
    //});
    //  .catch(e => console.log(e))
    //  .then(() => pool.release())//close connection
    }
catch(err){
   console.log("What went wrong");
   console.log(err);
}
}

module.exports.queryBookTitle = queryBookTitle;
