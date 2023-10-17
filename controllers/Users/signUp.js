import { User } from "../../models";
import { getToken, hashPwd } from "../../utility";

export const signUp = async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})

        if (user) {
            return res.status(409).json({
                message: "user with this email already exists, try others",
            });
        }

        let hashedPwd = await hashPwd(req.body.password)

        req.body.password = hashedPwd

        let newUser = await User.create(req.body)
        
        let token = getToken({_id:newUser._id})

        res.status(201).json({
            message: "user registerd successfully",
            access_token: token,
            user: {
                email: newUser.email,
                fullNames: newUser.fullNames,
                location: newUser.location,
                role: newUser.role,
            },
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
        
    }
    
}