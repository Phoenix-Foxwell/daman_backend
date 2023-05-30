const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;
var moment = require('moment');

//TABLES DECLARATION
const rooms = db.rooms;
const room_reservation = db.room_reservation;
const users= db.users;
const wallet_trans= db.wallet_trans;

//USER CONTROLLER
class RoomsController {

    get_room_list = async (req, res) => {
        try {
            let from_date= req.body.from_date?req.body.from_date:moment().format('YYYY-MM-DD');
            let to_date= req.body.to_date?req.body.to_date:moment().format('YYYY-MM-DD');
            await db.sequelize.query(`SELECT sum(quantity) as total,room_id FROM tbl_room_reservations where from_date ='${from_date}' or to_date = '${to_date}' group by room_id`, { type: db.sequelize.QueryTypes.SELECT })
            .then(async resp => {
                if (resp) {
                    await rooms.findAll({
                        where: { status: true }
                    }).then(async res_user => {
                        let room_array=[];
                        for (let i = 0; i < res_user.length; i++) {
                            let element = res_user[i].dataValues;
                            let isavailable = resp.find(item => item.room_id == element.id);
                            if(typeof isavailable != "undefined" && isavailable.total == element.qty){
                                continue;
                            }
                            if(typeof isavailable != "undefined" && isavailable.total < element.qty){
                                element.qty=element.qty-isavailable.total;
                            }
                            room_array.push(element)
                        }
                        // console.log("room_array",room_array);
                        if (room_array.length>0) {
                            return res.status(200).json({
                                status: true,
                                message: "Rooms found.",
                                data: room_array
                            });
        
                        } else {
                            return res.status(200).json({
                                status: false,
                                message: "Rooms not found."
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Not available."
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
            await db.sequelize.query(`SELECT sum(quantity) as total FROM tbl_room_reservations where room_id=${data.room_id} and (from_date in ('${data.from_date}','${data.to_date}'))`, { type: db.sequelize.QueryTypes.SELECT })
            .then(async resp => {
                if (resp) {
                    let rommsqty= await rooms.findOne({where:{id:data.room_id}});
                    if(resp[0].total>=rommsqty.dataValues.qty){
                        return res.status(200).json({
                            status: false,
                            message: "Not available."
                        });
                    }else{
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
                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Not available."
                    });
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
                        status: false,
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