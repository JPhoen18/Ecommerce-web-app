

var newpool;
var ordersarray;
var finalordersarray;

async function getOrdersItemArray(obj){
    var ordersitemarray = [1];
    console.log('Here is the array of user orders');
    ordersarray = obj.rows;
    console.log(ordersarray);

    for(var x in ordersarray){
        //console.log(ordersarray[x].orderid);
        await newpool.query('SELECT * FROM orderitem WHERE orderid=$1',[ordersarray[x].orderid])
        .then((res) => {
             console.log("Here are the items for this order!");
             console.log(res.rows);
          //   iteminfo = res.rows;

          for(var y in res.rows){
             var temporderitemarray = res.rows[y];
             if (ordersitemarray[0] === 1){
                ordersitemarray[0] = temporderitemarray;
                continue; //used here to break out of a function , similar to the continue statement.
                }
             if(ordersitemarray[0] !== 1){
                     ordersitemarray = ordersitemarray.concat(temporderitemarray);
              };

           }

          });

    }

    console.log('ordersitemarray finished:');
    console.log(ordersitemarray);
    return ordersitemarray;
//    ordersitemarray finished:
//[
//  { orderid: 1, orderitemid: 2 },
//  { orderid: 1, orderitemid: 4 },/
//  { orderid: 1, orderitemid: 33 },
//  { orderid: 2, orderitemid: 18 },
//  { orderid: 2, orderitemid: 23 },
//  { orderid: 2, orderitemid: 26 },
//  { orderid: 3, orderitemid: 14 },
//  { orderid: 3, orderitemid: 20 },
//  { orderid: 3, orderitemid: 35 }
// ]

}

async function getPictureItemArray(obj){

   finalordersarray = [1];
   var tempOrderItemID = obj;
   console.log('Here we are in the getPictureItemArray');
   console.log(tempOrderItemID);

   for(var orderobj of tempOrderItemID){
     console.log(orderobj);
     var itemtableobj = await newpool.query('SELECT * FROM item WHERE itemid=$1',[orderobj.orderitemid])
     .then((res) => {
          console.log("Here are the items for this order!");
          console.log(res.rows);
          return res.rows[0]
        });

      var itempicture = await newpool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[orderobj.orderitemid])
      .then((res) => {
           console.log("Here are the pictures for this order!");
           console.log(res.rows);
           return res.rows[0]
         });

         console.log('Items from item tab and itempicture tab');
         console.log(itemtableobj);
         console.log(itempicture);

    var orderitempackage = {orderid : orderobj.orderid, itemid: orderobj.orderitemid, compobjinfo: itemtableobj, picture: itempicture};

    console.log('orderitempackage');
    console.log(orderitempackage);

   //append the orderitempackage obj to the finalordersarray
    if (finalordersarray[0] === 1){
       finalordersarray[0] = orderitempackage;
       continue; //used here to break out of a function , similar to the continue statement.
       }
    if(finalordersarray[0] !== 1){
            finalordersarray = finalordersarray.concat(orderitempackage);
     };
   }

   console.log('finalordersarray');
   console.log(finalordersarray);
   return finalordersarray;

}

async function userOrderFunc(idobj, pol, func){

   console.log('In the user order function')
   newpool = pol;
   console.log(idobj)
   console.log(newpool)


   try {
       newpool.connect()
         // .then((client) => console.log("Connected Success!"))
          .then((client) => { client.query('SELECT * FROM orderstable WHERE orderuserid=$1',[idobj]) //1. query every mens fabric
          .then(getOrdersItemArray)
          .then(getPictureItemArray)
          .then((res) =>{
            console.log(res)
          //.then(getOrdersItemArray)
          func([res, ordersarray]);
          client.release();
          });

         });
      }

         catch(err){
           console.log('This query is not working great');
              console.log(err);
         }

}

module.exports.userOrderFunc = userOrderFunc;
