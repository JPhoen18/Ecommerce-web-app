

async function saveUserOrder(pool, userorder, newfunc){
  var orderSavedDate;
  var itemscount = 0;
  var totalItemPrice = 0;
  var secondValues;
  var userID;
  var date = new Date();
  var etaDate = new Date(date.setDate(date.getDate() + 14));
  var homeAddress = userorder[1].homeaddress;
  var userPayment = userorder[1].currentcreditcard;


  var cartOnly = userorder[0];

orderSavedDate = new Date();
userID = userorder[1].userid





//If this cart is brand new and simply needs to be added as a new cart
//if(cartOnly[0].iteminfo[0]!=undefined){

  for(var y of cartOnly){

    itemscount = itemscount + (y.cartitemamount);
    totalItemPrice = totalItemPrice + (y.iteminfo[0].price * y.cartitemamount);

  }

  console.log("Useful for insertion");
  console.log(itemscount);
  console.log(totalItemPrice);
  console.log(orderSavedDate);
  console.log(etaDate);
  console.log(userID);

  //code to save the actual cart info
  const createQuery = `INSERT INTO
    orderstable(orderdateplaced, totalprice, orderitemscount, etadate, orderuserid, orderaddress, ordercardpayment)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
// in the database, need to figure out how to undo the nextval() setting on the orderuserid
  const values = [

    orderSavedDate,
    totalItemPrice,
    itemscount,
    etaDate,
    userID,
    homeAddress,
    userPayment

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
  console.log("rows in question");
  console.log(rows);

  const createSecondQuery = `INSERT INTO
    orderitem(orderid, orderitemid)
    VALUES($1, $2)
    returning *`

  for(var x of cartOnly){
    for(var i=0; i<x.cartitemamount; i++){

       secondValues = [
         rows[0].orderid,
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




module.exports.saveUserOrder = saveUserOrder;
