//import bcrypt from 'bcrypt';
const bcrypt = require('bcryptjs');
//import jwt from 'jsonwebtoken';
var async = require('async');
var jwt = require("jsonwebtoken");
const JWT_SECRET = "SECRET393232023203290";
//process.env.SECRET
const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      JWT_SECRET, { expiresIn: '2h' }
    );
    console.log('token after generateToken call');
    console.log(token);
    return token;
  },

  async verifyToken(req,res){
  // const token = req.headers['x-access-token'];
  var tokencheck;
  var pool = req.body[1];
  console.log('here is that token');
  console.log(req.body);

  console.log("Verify JWT");
  console.log(req.headers);
  if ('authorization' in req.headers){//if ('authorization' in req.headers) //if we have this property, then go ahead with jwt authentiation
        tokencheck = req.headers['authorization'].split(' ')[1];
        console.log("We did it!")
        console.log(req.headers)
      }
   if(!tokencheck){
     return { 'message': 'token is not provided' };
   }
   else {

      try {
     const decoded = await jwt.verify(tokencheck, JWT_SECRET);
     const text = 'SELECT * FROM useraccount WHERE userid = $1';

     const { rows } = await pool.query(text, [decoded.userId]).then((res) => {
       console.log(res);
       return res;
       client.release();
     });
       console.log('verify row');
       console.log(rows);
     if(!rows[0]) {
       return { 'message': 'The token you provided is invalid' };
     }
     return { id: decoded.userId, firstname:rows[0].firstname, lastname:rows[0].lastname, email:rows[0].email}; //id we will use for profile information.

   } catch(error) {
     console.log('bad error guys');
     console.log(error);
     return error;
   }
 }
 }

}


module.exports = Helper;
