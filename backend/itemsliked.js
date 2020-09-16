var newpool;
var useritemarray;
var finisheduseritemarray;

async function userItems(itemslikedIDs){
   finisheduseritemarray = [1];
   console.log('itemslikedIDs');
   console.log(itemslikedIDs.rows);
   newitemslikedIDs = itemslikedIDs.rows;

   for(var itemsliked of newitemslikedIDs){
     console.log(itemsliked);
     var itemslikedobj = await newpool.query('SELECT * FROM item WHERE itemid=$1',[itemsliked.markeditemid])
     .then((res) => {
          console.log("Here is the item");
          console.log(res.rows);
          return res.rows[0]
        });

      var itemlikedpicture = await newpool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[itemsliked.markeditemid])
      .then((res) => {
           console.log("Here is the picture for this item!");
           console.log(res.rows);
           return res.rows[0]
         });

         var itemlikedpicturetwo = await newpool.query('SELECT * FROM itemsecondimage WHERE itemsecondimageid=$1',[itemsliked.markeditemid])
         .then((res) => {
              console.log("Here is the picture for this item!");
              console.log(res.rows);
              return res.rows[0]
            });


            var itemlikedpicturethree = await newpool.query('SELECT * FROM itemthirdimage WHERE itemthirdimageid=$1',[itemsliked.markeditemid])
            .then((res) => {
                 console.log("Here is the picture for this item!");
                 console.log(res.rows);
                 return res.rows[0]
               });

         console.log('Items from item tab and itempicture tab');
         console.log(itemslikedobj);
         console.log(itemlikedpicture);

    var itemlikedpackage = {compobjinfo: itemslikedobj, iteminfo: [itemslikedobj], picture: itemlikedpicture,
         itemimage:[itemlikedpicture], itemsecondimage:[itemlikedpicturetwo], itemthirdimage:[itemlikedpicturethree]};

    console.log('itemlikedpackage');
    console.log(itemlikedpackage);

   //append the orderitempackage obj to the finalordersarray
    if (finisheduseritemarray[0] === 1){
       finisheduseritemarray[0] = itemlikedpackage;
       continue; //used here to break out of a function , similar to the continue statement.
       }
    if(finisheduseritemarray[0] !== 1){
            finisheduseritemarray = finisheduseritemarray.concat(itemlikedpackage);
     };
   }
   console.log('finisheduseritemarray finished:');
   console.log(finisheduseritemarray);
   return finisheduseritemarray;

}

async function useritemslikedFunc(idobj, pol, func){

   console.log('In the user order function')
   newpool = pol;
   console.log(idobj)
   console.log(newpool)


   try {
       newpool.connect()
         // .then((client) => console.log("Connected Success!"))
          .then((client) => { client.query('SELECT * FROM itemsliked WHERE markeduserid=$1',[idobj]) //1. query every mens fabric
          .then(userItems)
          .then((res) =>{
            console.log(res)
          //.then(getOrdersItemArray)
          func(res);
          client.release();
          });

         });
      }

         catch(err){
           console.log('This query is not working great');
              console.log(err);
         }

}

module.exports.useritemslikedFunc = useritemslikedFunc;
