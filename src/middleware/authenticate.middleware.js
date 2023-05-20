const jwt = require('jsonwebtoken');
const config = require('../../config/config')
const db = require("../models");
const admins = db.users;

const isAuthenticate = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        jwt.verify(token, config.secret, { algorithm: "HS256" }, async (err, admin) => {
            if (err) {
                return res.status(401).json({ status: 0, message: "Unauthorized", data: {} });
            } else {
                var admin_id = admin.id;
                var checkBlock = await admins.findOne({ where: { id: admin_id } });
                
                if (checkBlock.dataValues) {
                    return next();
                } else {
                    return res.status(401).json({ status: false, errcode: "401", message: "Unable to login. Please contact support..", data: {} });
                }

            }
        }, err => {
            return res.status(401).json({ status: 0, message: "Unauthorized.", data: {} });
        });
    } catch (err) {
        return res.status(401).json({ status: false, errcode: "401", message: "Unable to login. Please contact support....", data: {} });

    }

}



module.exports = {
    isAuthenticate
};
