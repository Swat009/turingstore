const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.get('USER-KEY');
    if(!authHeader){

        //const error = new Error('Not authenticated');
        //error.statusCode = 401;
        //throw error;
        return res.status(401).json({
        "code": "AUT_02",
        "message": "The apikey is not present.",
        "field": "API-KEY"}
        );

    }

    const token = req.get('USER-KEY').split(' ')[1];
    let decodedToken;
    try{

        decodedToken = jwt.verify(token, process.env.JWTSECRETKEY);

    }catch (err){
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken){

        //const error = new Error('Not authenticated');
        //error.statusCode = 401;
        //throw error;
        return res.status(401).json({
            "code": "AUT_02",
            "message": "The apikey is invalid.",
            "field": "API-KEY"}
        );
    }
    req.userId = decodedToken.userId;
    next();


};