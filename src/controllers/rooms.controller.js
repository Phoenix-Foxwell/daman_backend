const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;

//TABLES DECLARATION
const rooms = db.rooms;
const room_reservation = db.room_reservation;
const users= db.users;
const wallet_trans= db.wallet_trans;

//USER CONTROLLER
class RoomsController {

    get_room_list = async (req, res) => {
        try {
            await rooms.findAll({
                where: { status: true }
            }).then(async res_user => {
                if (res_user) {
                    return res.status(200).json({
                        status: true,
                        message: "Rooms found.",
                        data: res_user
                    });

                } else {
                    return res.status(200).json({
                        status: true,
                        message: "Rooms not found."
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    room_reservation = async (req, res) => {
        try {
            let data = req.body;
            let user_data= await users.findOne({where: {id:data.user_id}})
            await room_reservation.findOne({
                where: { room_id: data.room_id,
                    [Op.or]: [{
                        from_date: {
                          [Op.between]: [data.from_date, data.to_date]
                        },
                        to_date: {
                            [Op.between]: [data.from_date, data.to_date]
                          }
                      }]}
            }).then(async resp => {
                if (resp) {
                    return res.status(200).json({
                        status: true,
                        message: "Not available."
                    });

                } else {
                    if(user_data.dataValues.walletbalance >= data.price){
                        await room_reservation.create(req.body).then(async resps => {
                            await users.update({ walletbalance: user_data.dataValues.walletbalance - data.price }, { where: { id: user_data.id }, limit: 1 })
                            await wallet_trans.create({
                                user_id: user_data.dataValues.id,
                                amount: data.price,
                                credit_debit: 2,
                                machine_id: 2
                            })
                            return res.status(200).json({
                                status: true,
                                message: "Room booked."
                            });
                        });
                    }else{
                        return res.status(200).json({ status: false, message: "Please Recharge your wallet." });
                    }
                    
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    get_room_reservation = async (req, res) => {
        try {
            let data = req.body;
            await room_reservation.findAll({
                where: {user_id: data.user_id }
            }).then(async resp => {
                if (resp.length>0) {
                    return res.status(200).json({
                        status: true,
                        message: "Rooms found.",
                        data: resp
                    });

                } else {
                    return res.status(200).json({
                        status: true,
                        message: "Rooms not available."
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }
    
}

module.exports = new RoomsController();