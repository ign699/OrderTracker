const mysql = require('mysql');

const conn = mysql.createConnection({
  host      : 'localhost',
  user      : 'root',
  password  : 'root',
  database   : 'test'
});

const connection = {
  query: (query, params) => {
    return new Promise((resolve, reject) => {
      conn.query(query, params, (error, results, fields) => {
        if(error) {
          return reject(error);
        } else {
          resolve(results);
        }
      });
    }); 
  }
}

module.exports = connection;


