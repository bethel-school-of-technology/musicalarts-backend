const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretKey = 'ThisIsTheSecretKey';

module.exports = {
    createJWT: (user) => {
        const token = jwt.sign({
            username: user.username,
            id: user.id
        },
            secretKey,
            {
                expiresIn: '1y'
            });

        return token;
    },
    verifyUser: (token) => {
        try {
            const decodedPayload = jwt.verify(token, secretKey);
            return User.findByPk(decodedPayload.id);
        } catch (err) {
            return null;
        }


    }
};