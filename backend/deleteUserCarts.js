
async function deleteCartAndItems(pool, cartID, userID, func){

   console.log(cartID);
   var objDeleted;
   const deleteQuery = `DELETE FROM shoppingcart WHERE cartid = $1 AND cartuserid = $2
     returning *`;  //need to have the cartuserid as a conditional.  go back and pass the id for the next cart
   const deleteItemsQuery = `DELETE FROM cartitem WHERE cartid = $1
     returning *`;

   const deleteCartValues = [
     cartID,
     userID
   ];

   const deleteItemsValues = [
      cartID
   ];

   try{
          await pool.connect()
            .then(  (client) => {  client.query(deleteItemsQuery, deleteItemsValues)
             .then((obj) =>{
             console.log("Confirming the writing to the database");
               console.log(obj);
               //imageArray = obj;
               client.release();

               })
             });
         func(objDeleted);
     }

     catch(err){
        console.log('Issue with cart item deletion');
        console.log(err);
     }
     
   try{

    objDeleted = await pool.connect()
       .then(  (client) => {  client.query(deleteQuery, deleteCartValues)
        .then((obj) =>{
        console.log("Deleted the cart");
          console.log(obj);
          //imageArray = obj;
          return obj;
          client.release();

          })
        });

      console.log("objDeleted");
      console.log(objDeleted);
  }
  catch(err){
    console.log("Issue with cart deletion");
    console.log(err);
  }





}


module.exports.deleteCartAndItems = deleteCartAndItems;
