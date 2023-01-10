const mysql   = require('mysql');

/* mysql connection */
// const connection = mysql.createConnection({
//     host : 'localhost',
//     user : 'andmoa',
//     password : 'andmoa123!',
//     database : 'MOAMOA'
//   });
// connection.connect();

// require 키워드는 object 를 반환합니다.
// 그리고 module.exports 와 exports 는 call by reference 로 동일한 객체를 바라보고 있고,
// 리턴되는 값은 항상 module.exports 입니다.
// module.exports = connection;
console.log('db connected');