const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const Op = db.Sequelize.Op;

//TABLES DECLARATION
const messages = db.messages


//USER CONTROLLER
class MessageController {

    get_messages = async (req, res) =>{
        try {
            await messages.findAll({
                where: {[Op.or]: [
                    { sender: req.body.user_id }, 
                    { receiver: req.body.user_id }
               ]}
            }).then(async res_user => {
                if (res_user) {
                    return res.status(200).json({
                            status: true,
                            message: "Guests found.",
                            data: res_user
                        });
                    
                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Guest not found."
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }   
    }


}


module.exports = new MessageController();