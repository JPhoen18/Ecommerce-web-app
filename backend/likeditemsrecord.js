

var secondpool;

async function storeLikedItems(pool, likeditempack, fn){
  console.log(likeditempack);
  secondpool = pool;

  secondpool.connect()
  .then((client) =>
     {
       client.query("SELECT * FROM itemsliked WHERE markeduserid=$1 AND markeditemid=$2",[likeditempack.userid, likeditempack.itemid])
      .then( async(res) =>{
        console.log(res.rows);

              if(!res.rows.length){
                console.log("There is no item here.  Needs to be recorded");

                const createQuery = `INSERT INTO
                  itemsliked(markeditemid, markeduserid)
                  VALUES($1, $2)
                  returning *`;

                const values = [
                  likeditempack.itemid,
                  likeditempack.userid,
                ];

                 var itemstored = await client.query(createQuery, values)
                    .then((res) =>{
                         console.log(res);
                         return res;
                    });

                  fn(itemstored);


              }
      //  return;
      client.release();
    });

    });

};

module.exports.storeLikedItems = storeLikedItems;
