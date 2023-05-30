//require('dotenv').config()
let config = {
    debug: true,
    port: 5000,
    secret: 'test',
    database: {
      host: 'localhost',
      username: 'anvi',
      password: 'anvi1994',
      database: 'daman_club',
      dialect: 'mysql',
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
}
// let config = {
//   debug: true,
//   port: 5000,
//   secret: 'test',
//   database: {
//     host: 'localhost',
//     username: 'root',
//     password: '',
//     database: 'daman_club',
//     dialect: 'mysql',
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   }
// }
module.exports = config;