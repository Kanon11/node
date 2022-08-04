const pool = require("../../config/database");

module.exports = {
    create: (data,callBack) => {
        pool.query(`
        insert into register(firstName, lastName, gender, email, password, msisdn) 
                values(?,?,?,?,?,?)
        `, [
            data.firstName,
            data.lastName,
            data.gender,
            data.email,
            data.password,
            data.msisdn
        ], (error,results,fields) => {
            if (error) {
              return  callBack(error);
            }
            return callBack(null, results);
        });
    },
    getallUsers: (callback) => {
        pool.query(`select * from register`, [], (error,results,fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        })
    },
    getUserbyEmail: (email, callBack) => {
        pool.query(`select * from register where email=? `, [email], (error,results,fields) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results[0]);
        })
    }
}