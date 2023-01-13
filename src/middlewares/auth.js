const jwt =  require('jsonwebtoken');
require('dotenv').config();


const authMiddleware = (req, res, next) =>{
    const token = req.headers.authorization;
    jwt.verify(token, process.env.SECRETWORD, (err, decoded) => {
        if (err){
            res.send('Aquí se traba')
           // res.sendStatus(401);
            return;
        }

        req.user = decoded;
        console.log(req.user);
        next();
    })
}

module.exports = authMiddleware;