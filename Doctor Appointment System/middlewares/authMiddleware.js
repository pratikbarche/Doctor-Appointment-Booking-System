import jwt from 'jsonwebtoken';


export default async (req, res, next) => { 
    try {
        const token =await req.headers['authorization'].split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET, (err, decode) => {
            if (err)
            {
                return res.status(200).send({ message: " Auth failed", success: false });
            } else {
                req.body.userId= decode.id;
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({ message: "authfailed", success: false });
    }
}