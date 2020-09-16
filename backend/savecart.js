

async function saveUserCarts(pool, usercart, newfunc){
  var cartSavedDate;
  var itemscount = 0;
  var totalItemPrice = 0;
  var secondValues;
  var userID;

  var cartOnly = usercart[0];

//for(var x of usercart){
//  console.log("Each item in the usercart");
//   console.log(x);

//   try{

//   }

//   catch(err){

//   }

//}
//return;
cartSavedDate = new Date();
userID = JSON.parse(usercart[1]).id

if(cartOnly[0].cartid!=undefined){ // if this cart already exists and just needs to be updated


  for(var y of cartOnly){

     itemscount = itemscount + (y.cartitemamount);
     totalItemPrice = totalItemPrice + (y.iteminfo[0].price * y.cartitemamount);

  }

  console.log("Useful for insertion");
  console.log(itemscount);
  console.log(totalItemPrice);
  console.log(cartSavedDate);
  console.log(userID);

  //code to save the actual cart info
  const createQuery = `UPDATE
    shoppingcart
    SET cartcreation=$1, currentitemscount=$2, totalprice=$3, cartuserid=$4
    WHERE cartid=$5
    returning *`;

  const values = [

    cartSavedDate,
    itemscount,
    totalItemPrice,
    userID,
    cartOnly[0].cartid
  ];

  try {
    var { rows } = await pool.query(createQuery, values).then((res) => {
      console.log(res);
      return res;
      client.release();
    });

      console.log('rows');
      console.log(rows);

    }

    catch(err){
      console.log(err);
    }


//Code to delete items belonging to the updated cart row, which will then be replaced by any changes made
  const createSecondQuery = `INSERT INTO
    cartitem(cartid, cartitemid)
    VALUES($1, $2)
    returning *`

  const deleteItemsQuerySecond = `DELETE FROM cartitem WHERE cartid = $1
      returning *`;
  const deleteItemsValuesSecond = [
         cartOnly[0].cartid
      ];

      try{
             await pool.connect()
               .then(  (client) => {  client.query(deleteItemsQuerySecond, deleteItemsValuesSecond)
                .then((obj) =>{
                console.log("Confirming the writing to the database");
                  console.log(obj);
                  //imageArray = obj;
                  client.release();

                  })
                });

        }

        catch(err){
           console.log('Issue with cart item deletion');
           console.log(err);
      }

  //code to save (potentially) new individual items (need the cart id in order to do this)
  for(var x of cartOnly){
    for(var i=0; i<x.cartitemamount; i++){

       secondValues = [
         rows[0].cartid,
         x.cartitemid
       ];

       try {
          await pool.connect()
            .then(  (client) => {  client.query(createSecondQuery, secondValues)
             .then((obj) =>{
             console.log("Confirming the writing to the database");
               console.log(obj);
               imageArray = obj;
               client.release();

               })
             });

           }
       catch(err){
          console.log("What went wrong");
          console.log(err);
       }

    }
  }

    return;
  }





//If this cart is brand new and simply needs to be added as a new cart
//if(cartOnly[0].iteminfo[0]!=undefined){

  for(var y of cartOnly){

    itemscount = itemscount + (y.cartitemamount);
    totalItemPrice = totalItemPrice + (y.iteminfo[0].price * y.cartitemamount);

  }

  console.log("Useful for insertion");
  console.log(itemscount);
  console.log(totalItemPrice);
  console.log(cartSavedDate);
  console.log(userID);

  //code to save the actual cart info
  const createQuery = `INSERT INTO
    shoppingcart(cartcreation, currentitemscount, totalprice, cartuserid)
    VALUES($1, $2, $3, $4)
    returning *`;
  const values = [

    cartSavedDate,
    itemscount,
    totalItemPrice,
    userID

  ];

  try {
    var { rows } = await pool.query(createQuery, values).then((res) => {
      console.log(res);
      return res;
      client.release();
    });

      console.log('rows');
      console.log(rows);

    }

    catch(err){
      console.log(err);
    }

  //code to save individual items (need the cart id in order to do this)

  const createSecondQuery = `INSERT INTO
    cartitem(cartid, cartitemid)
    VALUES($1, $2)
    returning *`

  for(var x of cartOnly){
    for(var i=0; i<x.cartitemamount; i++){

       secondValues = [
         rows[0].cartid,
         x.iteminfo[0].itemid
       ];


       try {
          await pool.connect()
            .then(  (client) => {  client.query(createSecondQuery, secondValues)
             .then((obj) =>{
             console.log("Confirming the writing to the database");
               console.log(obj);
               //imageArray = obj;
               client.release();

               })
             });

           }
       catch(err){
          console.log("What went wrong");
          console.log(err);
       }

    }

  }


}




module.exports.saveUserCarts = saveUserCarts;
