var express = require("express");
var cors = require("cors")
var async = require('async');
var bodyParser = require('body-parser');
var genderfabrics = require('/backend/genderfabrics');
var womengenderfabrics = require('/backend/womengenderfabrics');
var jewelryItems = require('/backend/jewelrygender');
var popartquery = require('/backend/popartquery');
var popbookquery = require('/backend/queryBooks');
var userOrderHub = require('/backend/collectorders');
var userCartHub = require('/backend/obtainsavedcarts');
var itemslikedhub = require('/backend/itemsliked');
var allmensclothing = require('/backend/mensclothing');
var savingcarts = require('/backend/savecart');
var deletingcarts = require('/backend/deleteUserCarts');
var savingorders = require('/backend/saveorder');
var mainjewelrypages = require('/backend/mainjewelrypages');
var artpagequery = require('/backend/artpagequery');
var bookpagequery = require('/backend/bookpagefetch');
var furniturepagequery = require('/backend/furniturefetch');
var likeditemsrecord = require('/backend/likeditemsrecord');

const User = require('/backend/controllers/UserController');
const Helper = require('/backend/controllers/UserHelper');

//import express from 'express';
//import cors from 'cors';
//import bodyParser from 'body-parser';

const app = express();
const router = express.Router();
app.use(bodyParser.json({limit:'50mb'}));
app.use(cors());

const { Pool } = require('pg')

const pool = new Pool({ //change this to a json file later
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }

})

//const pool = new Pool({ //change this to a json file later
//  user: "postgres",
//  password: "Commerce19!",
//  host: "localhost",//host: "localhost",
//  max: 30,
//  port: 5432,
//  database: "ecommerceapp"


//})


router.route('/ecommerceapp/getPopItems').get((req, resp) =>{



    let avg = 1;
    //console.log("SELECT * FROM item WHERE itemspurchased>? ORDER BY itemspurchased;",[avg]);
    var imageArray;
    let query = 1;
    //let popItems = 1;



    function setAverage(res){ // retrieves average items purchased and constructs query object
      console.log(res.rows[0].avg);
      avg = res.rows[0].avg;

      query = {
      name: 'fetch-user',
      text: 'SELECT * FROM item WHERE itemspurchased > $1 ORDER BY itemspurchased',
      values: [parseInt(avg)]
    };

    console.log(query);
    }

  async function getPicture(popobj){ //takes in the most popular pictures, queries database to get corresponding images
    //** 1/1/20 this function works
        imageArray = [1];
        //console.log(popobj.rows);
  for(var obj of popobj.rows){ //  async.eachSeries(popobj.rows, async function(obj){  //  for(var obj of popobj.rows){
            var imgpackage = 1;
            //console.log("Check it out!");
            //  console.log(obj);
          //console.log(obj.itemid); ** this works
          const newpack = await pool.query('SELECT * FROM itemfirstimage WHERE itemfirstimageid=$1',[obj.itemid])
            .then((qobj) =>{

              imgpackage =  { 'url':qobj.rows[0], 'item':obj };
              //console.log(imgpackage);
            });
            // **1/1 -- this works too
                if (imageArray[0] === 1){
                    imageArray[0] = imgpackage;
                    continue;
                  }
            //  if(imageArray[0] !== 1){
              imageArray = imageArray.concat(imgpackage);
            //}
          }

        //console.log(imageArray);
        return imageArray;
};


try {
    pool.connect()
      // .then((client) => console.log("Connected Success!"))
       .then((client) => { client.query('SELECT AVG(itemspurchased) FROM item;')
//.then(() => client.query("SELECT * FROM item WHERE price=42"))
        .then(setAverage) //12/30 -- issues with this code, perhaps move to separate function
        .then(() => client.query(query))
    //    .then(resobj => console.log(resobj.rows))
        .then(getPicture)
        .then((obj) =>{
        console.log("sending needed info back");
          console.log(obj);
          imageArray = obj;
          client.release();
            resp.json(obj);
          });
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
  //console.log("Image Array");
  //console.log(imageArray);
  //resp.json("imageArray");

});

//1/22/2-- I tried to refactor the code by moving the majority of the route's code
// to the genderfabrics.js file.  However mensarray is still undefined, so need
//to figure out why.
router.route('/ecommerceapp/getMensClothes').get(async (req, resp) =>{

try{
  //callback
  //1/24/20 -- finally got this to work, and return mens clothing images randomly
  //got it to work using the callback function. Use same syntax for the other modules needed
  genderfabrics.getGenderFabrics('M', pool, false, function(result){
    console.log('result for fabrics');
  console.log(result);
  resp.json(result);

  });
  //var render = await genderfabrics.getGenderFabrics('M', pool);
  //console.log('render works');
  //console.log(render);
  //resp.json(render)
}
catch(err){
  console.log('render error');
  console.log(err);
}
  //var manfabrics = await genderfabrics.getGenderFabrics('M', pool);

  });

  router.route('/ecommerceapp/getWomensClothes').get(async (req, resp) =>{ //copy of getMensClothes above

  try{

    womengenderfabrics.getGenderFabrics('F', pool, function(result){
      console.log('result for womens fabrics');
    console.log(result);
    resp.json(result);

    });
}
  catch(err){
    console.log('render error');
    console.log(err);
  }

    });



    router.route('/ecommerceapp/getJewelry').get(async (req, resp) =>{ //copy of getMensClothes above

    try{

      jewelryItems.getGenderJewelry(pool, function(result){
        console.log('result for Jewelry');
      console.log(result);
      resp.json(result);

      });
  }
    catch(err){
      console.log('render error');
      console.log(err);
    }

      });

////ecommerceapp/getPopArt`
router.route('/ecommerceapp/getPopArt').get(  (req, resp) =>{

  try{

      popartquery.queryArtWork(pool, function(result){
      console.log('result for Art');
    console.log(result);
     resp.json(result);

    });

}

  catch(err){
    console.log('Art render error');
    console.log(err);
  }


  });


  //popbookquery
  router.route('/ecommerceapp/getPopBooks').get( (req, resp) =>{

    try{

         popbookquery.queryBookTitle(pool,  function(res){
        console.log('result for BookTitle');
        console.log(res);

       resp.json(res);

      });




  }

    catch(err){
      console.log('BookTitle error');
      console.log(err);
    }


    });

   router.route('/ecommerceapp/createUser').post(async (req, resp) =>{
     console.log('Here is the newest user in server.js');
     console.log(req.body);

    var newtoken = await User.create([req.body, pool]);
    resp.send(newtoken);
    //resp.status(200).json({'NewUserMessage': 'New User added successfully to database' });

   });


   ///ecommerceapp/loginUser

   router.route('/ecommerceapp/loginUser').post(async (req, resp) =>{
     console.log('Here is the login user creds in server.js');
     console.log(req.body);

    var logintoken = await User.login([req.body, pool]);
    resp.send(logintoken); //sending back the json web token once user login is accepted
    //resp.status(200).json({'NewUserMessage': 'New User added successfully to database' });

   });



   router.route('/ecommerceapp/retrieveCurrentUser/:getteremail').get(async (req, resp) =>{
     console.log('Here is the email needed to modify current user');
     console.log(req.params.getteremail);
     var tempemail = req.params.getteremail;
     var tempuser;
    // var userupdatesneeded;

     try {
         pool.connect()
            .then((client) => { client.query('SELECT * FROM useraccount WHERE email=$1',[tempemail])
               .then((obj) =>{
             console.log("here is the current user: ");
               console.log(obj);
               tempuser = obj;
               resp.json(tempuser.rows[0]);
               client.release();
               });
             });
           }

       catch(err){
          console.log("What went wrong");
          console.log(err);
       }
  //var logintoken = await User.login([req.body, pool]);
   //sending back the json web token once user login is accepted
    //resp.status(200).json({'NewUserMessage': 'New User added successfully to database' });
   });
//userTokenCheck

router.route('/ecommerceapp/updateCurrentUser/:currentUser').get(async (req, resp) =>{
  console.log('Here is the user info needed to modify current user');
  console.log(JSON.parse(req.params.currentUser));
  var tempcurrentUser = JSON.parse(req.params.currentUser);
  var editTempUser;
 // var userupdatesneeded;JSON.stringify(

 editTempUser = await User.modifyuser([tempcurrentUser, pool]);
 console.log('editTempUser');
console.log(editTempUser);
resp.send(editTempUser);

//sending back the json web token once user login is accepted
 //resp.status(200).json({'NewUserMessage': 'New User added successfully to database' });
});


router.route('/ecommerceapp/sendTokenGetId').post(async (req, resp) =>{
  console.log('Here is the user token in server.js');
  console.log(req.body);
  //console.log(typeof(req.body));
  req.body = [req.body, pool];
  console.log('new req.body');
  console.log(req.body);

 var loginUserID = await Helper.verifyToken(req,resp);
 resp.send(loginUserID); //sending back the json web token once user login is accepted
 //resp.status(200).json({'NewUserMessage': 'New User added successfully to database' });

});

// route to obtain every user order

router.route('/ecommerceapp/everyOrderNeeded/:userIDNeeded').get(async (req, resp) =>{

  console.log('Here is the user id needed to obtain current users orders');
  console.log(req.params.userIDNeeded);
  var userIDHere = req.params.userIDNeeded;
  //var everyuserorder;

  try {
     await userOrderHub.userOrderFunc(userIDHere, pool, function(orderres){
     console.log('everyuserorder var in server.js');
     console.log(orderres);
     resp.send(orderres);
     });
  }
  catch(err){
   console.log(err);
}


});


router.route('/ecommerceapp/everySavedCartNeeded/:useridcart').get(async (req, resp) =>{

  console.log('Here is the user id needed to obtain current users orders');
  console.log(req.params.useridcart);
  var userIDForCarts = req.params.useridcart;
  //var everyuserorder;

  try {
     await userCartHub.userCartFunc(userIDForCarts, pool, function(everycart){
     console.log('everycartorder var in server.js');
     console.log(everycart);
     resp.send(everycart);
     });
  }
  catch(err){
   console.log(err);
}


});


router.route('/ecommerceapp/everyItemLiked/:getitemsid').get(async (req, resp) =>{

  console.log('Here is the user id needed to obtain items liked');
  console.log(req.params.getitemsid);
   var idForItems = req.params.getitemsid;
  //var everyuserorder;
  try {
     await itemslikedhub.useritemslikedFunc(idForItems, pool, function(everylikeditem){
     console.log('everylikeditem var in server.js');
     console.log(everylikeditem);
     resp.send(everylikeditem);
     });
  }
  catch(err){
   console.log(err);
 }

});

router.route('/ecommerceapp/getMainPageMensClothes/:menspagecheck').get(async (req, resp) =>{

  console.log('Every Man Fabric');
  console.log(req.params.menspagecheck);
  var menswear = req.params.menspagecheck

try{

  genderfabrics.getGenderFabrics('M', pool, menswear, function(result){
    console.log('result for fabrics');
  console.log(result);
  resp.json(result);

});

}
catch(err){
  console.log('render error');
  console.log(err);
}
  //var manfabrics = await genderfabrics.getGenderFabrics('M', pool);

  });

  //routes for women's clothes Page
  router.route('/ecommerceapp/getMainPageWomensClothes/:womenspagecheck').get(async (req, resp) =>{

    console.log('Every Female Fabric');
    console.log(req.params.womenspagecheck);
    var womenswear = req.params.womenspagecheck

  try{

    genderfabrics.getGenderFabrics('F', pool, womenswear, function(result){
      console.log('result for fabrics');
    console.log(result);
    resp.json(result);

  });

  }
  catch(err){
    console.log('render error');
    console.log(err);
  }
    //var manfabrics = await genderfabrics.getGenderFabrics('M', pool);

    });
    //route for obtaining jewelry for jewelry pages
    router.route('/ecommerceapp/getMainPageJewelry/:jewelrypack').get(async (req, resp) =>{

      console.log(JSON.parse(req.params.jewelrypack));
      var infoHolder = JSON.parse(req.params.jewelrypack);
      var jewelrypage = infoHolder.pagecheck;
      var gender = infoHolder.gender;

    try{

      await mainjewelrypages.getJewelryByGender(gender, pool, jewelrypage, function(result){
        console.log('result for jewelry');
      console.log(result);
      resp.json(result);

    });

    }
    catch(err){
      console.log('render error');
      console.log(err);
    }
      //var manfabrics = await genderfabrics.getGenderFabrics('M', pool);

      });

  router.route('/ecommerceapp/saveCurrentCart').post(async (req, resp) =>{
    console.log('Here is the user cart in server.js');
    console.log(req.body);

    try{
      savingcarts.saveUserCarts(pool, req.body, function(result){
        console.log("Saving the carts and the items is a success!");
        console.log(result);
      })
    }
    catch(err){
      console.log(err);
    }

    resp.json(req.body);

  });

  router.route('/ecommerceapp/deleteCart').post(async (req, resp) =>{
    console.log('Here is the current user ID');
    console.log(req.body.cartID);
    console.log(req.body.userID);

    try{
      deletingcarts.deleteCartAndItems(pool, req.body.cartID, req.body.userID,function(result){
        console.log("Deleting the carts and corresponding items is a success!");
        console.log(result);
        resp.json(result);
      })
    }
    catch(err){
      console.log("Here is the problem:")
      console.log(err);
    }



  });


  router.route('/ecommerceapp/getMainPageArt').get(async (req, resp) =>{


    try{
      artpagequery.getAllArt(pool, function(result){
        console.log("Here are all the art pieces we need");
        console.log(result);
        resp.json(result);
      })
    }
    catch(err){
      console.log("Here is the problem:")
      console.log(err);
    }



  });

//route for the book main shopping page
  router.route('/ecommerceapp/getMainPageBooks').get(async (req, resp) =>{


    try{
      bookpagequery.getAllBooks(pool, function(result){
        console.log("Here are all the books we need");
        console.log(result);
        resp.json(result);
      })
    }
    catch(err){
      console.log("Here is the problem:")
      console.log(err);
    }



  });


  //**route for the furniture main shopping page
    router.route('/ecommerceapp/getMainPageFurniture').get(async (req, resp) =>{


      try{
        furniturepagequery.getAllFurniture(pool, function(result){
          console.log("Here is the furniture we need");
          console.log(result);
          resp.json(result);
        })
      }
      catch(err){
        console.log("Here is the problem:")
        console.log(err);
      }



    });

  router.route('/ecommerceapp/editCardInfo').post(async (req, resp) =>{
    console.log('Here is the new user credit card');
    console.log(req.body);

    var newcard = req.body.carddigits;
    var userid = req.body.userid;

    try{

      pool.connect()
         .then((client) => { client.query('UPDATE useraccount SET currentcreditcard=$1 WHERE userid=$2',[newcard, userid])
            .then((obj) =>{
          console.log("here is the current user  (updated): ");
            console.log(obj);
            tempuser = obj;
            resp.json(tempuser.rows[0]);
            client.release();
            });
          });

    }
    catch(err){
      console.log("Here is the problem:")
      console.log(err);
    }

  });


  router.route('/ecommerceapp/editShippingAddressInfo').post(async (req, resp) =>{
    console.log('Here is the new user shipping information');
    console.log(req.body);

    var newaddress = req.body.address;
    var userid = req.body.userid;

    try{

      pool.connect()
         .then((client) => { client.query('UPDATE useraccount SET homeaddress=$1 WHERE userid=$2',[newaddress, userid])
            .then((obj) =>{
          console.log("here is the current user  (updated address): ");
            console.log(obj);
            tempuser = obj;
            resp.json(tempuser.rows[0]);
            client.release();
            });
          });

    }
    catch(err){
      console.log("Here is the problem:")
      console.log(err);
    }



  });

  router.route('/ecommerceapp/submitCurrentOrder').post(async (req, resp) =>{
    console.log('Here is the user order in server.js');
    console.log(req.body);

    try{
      savingorders.saveUserOrder(pool, req.body, function(result){
        console.log("Saving the order and the order items is a success!");
        console.log(result);
      })
    }
    catch(err){
      console.log(err);
    }

    resp.json(req.body);

  });

// record items that have been liked
router.route('/ecommerceapp/recordItemsLiked').post(async (req, resp) =>{

          console.log("Here is the information needed to record the liked item");
          console.log(req.body);

          try{
               likeditemsrecord.storeLikedItems(pool, req.body, function(res){
                  console.log("Recording the liked items is a success!");
                  console.log(res);
                  resp.json(res);

               })
          }
          catch(err){
             console.log(err);
          }

});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
