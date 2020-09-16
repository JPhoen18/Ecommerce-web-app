//import moment from 'moment';
const moment = require('moment');
var async = require('async');
//import uuidv4 from 'uuid/v4';
//import db from '../db';
//import Helper from './Helper';
//const bcrypt = require('bcryptjs');
var pool;
const Helper = require('./UserHelper');
const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

//   async test(incoming) {/
//     console.log('Coming from the server')
//     console.log(incoming);
//     pool = incoming[1];
//   },

  async create(package) {  //creates a new user
    console.log('Coming from the server')
    console.log(package);
    pool = package[1];
    console.log(package[0]);
    console.log(package[1]);
    if (!package[0].email || !package[0].password) {
      return {'message': 'Some values are missing'};
    }
    if (!Helper.isValidEmail(package[0].email)) {
      return { 'message': 'Please enter a valid email address' };
    }
    const hashPassword = Helper.hashPassword(package[0].password);
    console.log('hashPassword');
    console.log(hashPassword);

    const createQuery = `INSERT INTO
      useraccount(email, password,firstname, lastname)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [

      package[0].email,
      hashPassword,
      package[0].firstname,
      package[0].lastname
    ];

    try {
      var { rows } = await pool.query(createQuery, values).then((res) => {
        console.log(res);
        return res;
        client.release();
      });

        console.log('rows');
        console.log(rows);

      const token = Helper.generateToken(rows.userid);
      console.log('token');
      console.log(token);
      return { token };
    } catch(error) {
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return { 'message': 'User with that EMAIL already exist' };
      }
      return error;
    }
  },

  /**
   * Modify A User who is logged in
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */

  async modifyuser(package) {
    var createQuery;
    var values;
    console.log('Coming from the server')
    console.log(package);
    pool = package[1];
    console.log(package[0]);
    console.log(package[1]);
    if (!package[0].email || !package[0].firstname || !package[0].lastname) {
      return {'message': 'Some values are missing'};
    }
    if (!Helper.isValidEmail(package[0].email)) {
      return { 'message': 'Please enter a valid email address' };
    }

    if(!package[0].password==''){
      const hashPassword = await Helper.hashPassword(package[0].password);

      console.log('hashPassword');
      console.log(hashPassword);

      createQuery = `UPDATE
        useraccount SET email=$1, mobilenumber=$2, password=$3, firstname=$4, lastname=$5, homeaddress=$6, currentcreditcard=$7
        WHERE userid=$8
        returning *`;
      values = [

        package[0].email,
        package[0].mobilenumber,
        hashPassword,
        package[0].firstname,
        package[0].lastname,
        package[0].homeaddress,
        package[0].currentcreditcard,
        package[0].userid
      ];
    }


if(package[0].password==''){

    createQuery = `UPDATE
      useraccount SET email=$1, mobilenumber=$2, firstname=$3, lastname=$4, homeaddress=$5, currentcreditcard=$6
      WHERE userid=$7
      returning *`;
    values = [

      package[0].email,
      package[0].mobilenumber,
      package[0].firstname,
      package[0].lastname,
      package[0].homeaddress,
      package[0].currentcreditcard,
      package[0].userid
    ];

  }

    try {
      //console.log('check the querys');
      //console.log(createQuery, values);
      var { rows } = await pool.query(createQuery, values).then((res) => {
        console.log('showing the new user obj');
        console.log(res);
        return res;
        client.release();
      });

        console.log('rows');
        console.log(rows);

      const token = Helper.generateToken(rows.userid);
      console.log('token');
      console.log(token);
      return { token, rows };
    } catch(error) {
      console.log('major error');
      console.log(error);
      if (error.routine === '_bt_check_unique') {
        return { 'message': 'User account cannot be updated' };
      }
      return error;
    }
  },
  /**
   * Login
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async login(loginpackage) {

    console.log('login Coming from the server')
    console.log(loginpackage);
    pool = loginpackage[1];
    console.log(loginpackage[0]);
    console.log(loginpackage[1]);

    if (!loginpackage[0].email || !loginpackage[0].password) {
      return {'message': 'Some values are missing'};
    }
    if (!Helper.isValidEmail(loginpackage[0].email)) {
      return {'message': 'Please enter a valid email address'};
    }
    const text = 'SELECT * FROM useraccount WHERE email = $1';
    try {
      const { rows } = await pool.query(text, [loginpackage[0].email]).then((res) => {
        console.log(res);
        return res;
        client.release();
      });

       console.log('rows');
       console.log(rows[0]);

      if (!rows[0]) {
        console.log('creds wrong');
        return {'message': 'The credentials you provided is incorrect'};
      }
      if(!Helper.comparePassword(rows[0].password, loginpackage[0].password)){
        console.log('creds wrong password wrong');
        return {'message': 'The credentials you provided is incorrect'};
      }
      console.log('Handing out the token soon');

      const token = Helper.generateToken(rows[0].userid);
      console.log('the token');
      console.log(token);
      return { token };

    } catch(error) {
      console.log('error');
      console.log(error);
      return error;
    }
  },
  /**
   * Delete A User
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'user not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },

  async userTokenCheck(req, res, next){
      console.log('new coin after update');
      console.log(req.body);
      const idtoreturn = await Helper.verifyToken(coin, newpool);
      console.log('idtoreturn');
      console.log(idtoreturn);
      return idtoreturn;
  }

}

module.exports = User;
