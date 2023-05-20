const Joi = require('joi');
const validation = (req, res, next) => {
    try {
        const data = req.fields;
        var schema = "";
        if (req.url === "/login") {
            schema = Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            });
        } else if (req.url === "/auth/adminlogin") {
            // schema = Joi.object({
            //     email: Joi.string().required(),
            //     password: Joi.string().required(),
            // });
        }

        var result = schema.validate(data).error
        if (result) {
            return res.status(400).json({
                flag: 0,
                message: result.details[0].message,
                data: ""
            })
        } else {
            return next();
        }
    } catch (e) {
        return res.status(400).json({
            flag: 0,
            message: e.message,
            data: ""
        })
    }
}
module.exports = {
    validation
};
