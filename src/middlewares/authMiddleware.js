import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyToken = (requiredRole='regular') => {
    return (req, res, next) => {
    
        const accessToken =  req.headers.authorization?.split(' ')[1];
        
        // If no access token is provided
        if (!accessToken) {
            return res.status(403).json({message: 'Access token is required'});
        }
        
        // verify access token
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              return res.status(401).json({ message: "Invalid or expired token" });
            }
    
            // Check for role
            const { role } = decoded;
            if (role !== requiredRole) {
                return res.status(403).json({ message: "Insufficient permissions" });
            }
    
            // Attach decoded data to request object for use in routes
            req.user = decoded;
            next();
        });
    }
}

export {verifyToken};