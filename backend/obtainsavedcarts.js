

var newpool;
var cartsarray;
var finalcartarray;

async function getCartItemArray(obj){
    var cartsitemarray = [1];
    console.log('Here is the array of user orders');
    cartsarray = obj.rows;
    console.log(cartsarray);

    for(var x in cartsarray){
        //console.log(ordersarray[x].orderid);
        await newpool.query('SELECT * FROM cartitem WHERE cartid=$1',[cartsarray[x].cartid])
        .then((res) => {
             console.log("Here are the items for this cart!");
             console.log(res.rows);
          //   iteminfo = res.rows;

          for(var y in res.rows){
             var tempcartitemarray = res.rows[y];
             if (cartsitemarray[0] === 1){
                cartsitemarray[0] = tempcartitemarray;
                continue; //used here to break out of a function , similar to the continue statement.
                }
             if(cartsitemarray[0] !== 1){
                     cartsitemarray = cartsitemarray.concat(tempcartitemarray);
              };

           }

          });

    }

    console.log('ordersitemarray finished:');
    console.log(cartsitemarray);
    return cartsitemarray;


}

async function getPictureItemArray(obj){

   finalcartarray = [1];
   var tempCartItemID = obj;
   console.log('Here we are in the getPictureItemArray');
   console.log(tempCartItemID);

   for(var cartobj of tempCartItemID){ // for each item that is in any cart the user has saved//
     console.log(cartobj);
     var itemtablecartobj = await newpool.query('SELECT * FROM item WHERE itemid=$1',[cartobj.cartitemid])
     .then((res) => {
          console.log("Here are the items for this cart!");
          console.log(res.rows);
          return res.rows[0]
        });

      var itemcartpicture = await newpool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[cartobj.cartitemid])
      .then((res) => {
           console.log("Here are the pictures for this cart!");
           console.log(res.rows);
           return res.rows[0]
         });

         console.log('Items from item tab and itempicture tab');
         console.log(itemtablecartobj);
         console.log(itemcartpicture);

    var cartitempackage = {cartid : cartobj.cartid, cartitemid: cartobj.cartitemid, iteminfo: [itemtablecartobj], itemimage: [itemcartpicture]};

    console.log('cartitempackage');
    console.log(cartitempackage);

   //append the orderitempackage obj to the finalordersarray
    if (finalcartarray[0] === 1){
       finalcartarray[0] = cartitempackage;
       continue; //used here to break out of a function , similar to the continue statement.
       }
    if(finalcartarray[0] !== 1){
            finalcartarray = finalcartarray.concat(cartitempackage);
     };
   }

   console.log('finalcartarray');
   console.log(finalcartarray);
   return finalcartarray;

}

async function userCartFunc(id, pol, func){

   console.log('In the user order function')
   newpool = pol;
   console.log(id)
   console.log(newpool)


   try {
       newpool.connect()
         // .then((client) => console.log("Connected Success!"))
          .then((client) => { client.query('SELECT * FROM shoppingcart WHERE cartuserid=$1',[id]) //1. query every mens fabric
          .then(getCartItemArray)
          .then(getPictureItemArray)
          .then((res) =>{
            console.log("just checking what I am getting back")
            console.log(res)
          //.then(getOrdersItemArray)
          func([res, cartsarray]);  //returning final cart array and
          client.release();
          });

         });
      }

         catch(err){
           console.log('This query is not working great');
              console.log(err);
         }

}

module.exports.userCartFunc = userCartFunc;
