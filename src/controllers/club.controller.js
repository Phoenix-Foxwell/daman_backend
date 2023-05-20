const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const Op = db.Sequelize.Op;

//TABLES DECLARATION
const messages = db.messages
const machines = db.machines

//USER CONTROLLER
class ClubController {

    get_club_activity = async (req, res) =>{
        try {
            await machines.findAll().then(async res_user => {
                if (res_user) {
                    return res.status(200).json({
                            status: true,
                            message: "Club activity found.",
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


module.exports = new ClubController();