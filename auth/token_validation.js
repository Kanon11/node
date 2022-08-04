const jwt = require("jsonwebtoken");
module.exports = {
    checkToken: (request,response,next) => {
        let token = request.get("authorization");
        console.log(token);
        if (token) {
            token = token.slice(7);
            jwt.verify(token,process.env.JWT_KEY, (error,decoded) => {
                if (error) {
                    return response.json({
                        success: 0,
                        message:"Invalid token"
                    })
                }
                else {
                    request.decoded = decoded;
                    next();
                }
            })
        }
        else {
            return response.json({
                success: 0,
                message:"Access Denied! Unauthorized User"
            })
        }
    }
}