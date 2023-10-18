import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let authorization = req.headers.authorization

        let tokenAuth = authorization?.split(" ")[1]

        if (!tokenAuth) {
            return res.status(401).json({
                message: "please, provide the valid access token!",
            });
        }

        jwt.verify(tokenAuth, process.env.JWT_SECRET_KEY, (err, verified) => {
            if (err) {
                return res.status(401).json({
                    message: err.message,
                });
            }
            
            req.UserId = verified._id
            next()

            console.log(verified._id, "tokenId");
            console.log(req.params.id, "reqId");

        })
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
}