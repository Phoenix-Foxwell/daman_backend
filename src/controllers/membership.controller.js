const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const Op = db.Sequelize.Op;

//TABLES DECLARATION
const membership_master = db.membership_master


//USER CONTROLLER
class MembershipController {

    get_membership_types = async (req, res) =>{
        try {
            await membership_master.findAll().then(async res_user => {
                if (res_user) {
                    return res.status(200).json({
                            status: true,
                            message: "Membership found.",
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


module.exports = new MembershipController();