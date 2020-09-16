var pool;

async function getPicture(popobj){ //takes in the most popular pictures, queries database to get corresponding images
  //** 1/1/20 this function works
      console.log("All art work!");
      console.log(popobj);
      firstimageArray = [1];
      //console.log(popobj.rows);
for(var obj of popobj.rows){ //  async.eachSeries(popobj.rows, async function(obj){  //  for(var obj of popobj.rows){
          var firstimagepackage = 1;
          //console.log("Check it out!");
          //  console.log(obj);
        //console.log(obj.itemid); ** this works
        const package = await pool.connect()
          .then((client) => { return client.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.itemid])
          .then((qobj) =>{

            firstimagepackage =  { 'url':qobj.rows[0], 'item':obj };
            console.log('art image imgpackage');
           console.log(firstimagepackage);

            client.release();
            return firstimagepackage;

          });
        });
          // **1/1 -- this works too
              if (firstimageArray[0] === 1){
                  firstimageArray[0] = package;
                  continue;
                }
          //  if(imageArray[0] !== 1){
            firstimageArray = firstimageArray.concat(package);
          //}
        }

      //console.log(imageArray);
      //const newImageArray = await Promise.all(imageArray);
     console.log('art image array');
     console.log(firstimageArray);
      return firstimageArray;
};


  function queryArtWork(pol, callback){
  pool = pol;
  art = 'art';

try {
   pool.connect()
     //.then(() => console.log("Connected Success!"))
     .then(  (client) => {  client.query('SELECT * FROM item WHERE itemcategory=$1',[art]) //this returns actual art 2/3/2020

  //    .then(resobj => console.log(resobj.rows))
      .then(getPicture)
      .then((obj) =>{
      console.log("sending needed art info back");
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

module.exports.queryArtWork = queryArtWork;
