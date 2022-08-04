const { create, getallUsers, getUserbyEmail } = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {sign } = require("jsonwebtoken");

module.exports = {
    createUser: (request, response) => {
        const body = request.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, res) => {
            if (err) {
                console.log(err);
                return response.status(500).json({
                    success: 0,
                    message: "DB connection error"
                })
            }
            return response.status(200).json({
                success: 1,
                data:res
            })
        })
    },
    getUser: (request,response) => {
        getallUsers((err,result) => {
            if (err) {
                return response.status(500).json({
                    success: 0,
                    message: "DB connection error"
                })

            }
            return response.status(200).json({
                success: 1,
                data: result
            })
        })
    },
    getUserbyEmail: (request, response) => {
        const email = request.body.email;
        getUserbyEmail(email, (err, res) => {
            if (err) {
                console.log(err);
                return response.status(500).json({
                    success: 0,
                    message: "DB connection error"
                })
            }
            return response.status(200).json({
                success: 1,
                data: res
            })
        })
    },
    login: (request,response) => {
        const body = request.body;
        getUserbyEmail(body.email, (err,res) => {
            if (err) {
                console.log(err);
            }
            if (!res) {
                return response.json({
                    success: 0,
                    data:"Invalid email or password"
                })
            }
            const gettedresult = compareSync(body.password, res.password);
            if (gettedresult) {
                res.password = undefined;
                const jwt = sign({ result: res }, "qwe1234", {
                    expiresIn: "1h"
                });
                return response.json({
                    success: 1,
                    message: "login successfully",
                    token: jwt
                });
            }
            else {
                return response.json({
                    success: 0,
                    message:" invalid email or password"
                })
            }
        })
    }

}
