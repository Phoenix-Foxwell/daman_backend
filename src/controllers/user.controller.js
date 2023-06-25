const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const jwt = require('jsonwebtoken');

//TABLES DECLARATION
const users = db.users;
const membership_transaction = db.membership_transaction;
const wallet_trans = db.wallet_trans;
const machines= db.machines;

//USER CONTROLLER
class UsersController {

    send_otp = async (req, res) => {
        try {
            await users.findOne({
                where: { mobile_no: req.body.mobile_no, status:1 }
            }).then(async res_user => {
                if (res_user) {
                    let update_array = {
                        'access_code': req.body.mobile_no.substr(req.body.mobile_no.length - 4)
                    }
                    await db.users.update(update_array, { where: { id: res_user.id }, limit: 1 }).then(async update_res => {


                        return res.status(200).json({
                            status: true,
                            message: "OTP successfully sent"
                        });
                    });
                } else {
                    return res.status(200).json({ status: false, message: "User not available." });

                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    verify_otp = async (req, res) => {
        try {
            await users.findOne({
                where: { access_code: req.body.access_code, mobile_no:req.body.mobile_no }
            }).then(async result => {
                if (result) {
                    let token = await jwt.sign(result.dataValues, config.secret, { algorithm: 'HS256', expiresIn: '365d' });
                    req.session.name = result.dataValues.name;
                    req.session.token = token;
                    req.session.role = result.dataValues.role;
                    req.session.loggedin = true
                    return res.status(200).json({
                        status: true,
                        message: "Login successfully",
                        data: result.dataValues,
                        access_token: token,
                        already_login: false
                    });
                } else {
                    return res.status(200).json({ status: false, message: "Invalid OTP." });
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(200).json({ status: false, message: "Invalid OTP." });
        }
    }

    register_user = async (req, res) =>{
        try {
            let data=req.body;
            await users.findOne({
                where: { mobile_no: req.body.mobile_no }
            }).then(async res_user => {
                if (res_user) {
                    return res.status(200).json({
                            status: true,
                            message: "Already register with that number."
                        });
                    
                } else {
                    let user_json={
                        name: data.name,
                        email: data.email,
                        mobile_no: data.mobile_no,
                        status: 0,
                        role: "MEMBER"
                    }
                    await users.create(user_json).then(async res_user =>{
                        if(res_user){
                            let member_tra_obj={
                                user_id: res_user.dataValues.id,
                                membershiptype_id: data.membershiptype_id,
                                amount: data.amount,
                                start_date: data.start_date,
                                end_date: data.end_date,
                                card_no: data.card_no,
                                status: 0,
                                payment_type: data.payment_type,
                                paymentref: data.paymentref
                            }
                            await membership_transaction.create(member_tra_obj).then(tran_res =>{
                                if(tran_res){
                                    return res.status(200).json({
                                        status: false,
                                        message: "Register with that number."
                                    });
                                }else{
                                    return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
                                }
                            })
                           
                        }else{
                            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
                        }
                        
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }   
    }

    get_wallet_amount = async (req, res) => {
        try {
            let data=req.body;
            await users.findOne({where : {id: data.user_id}}).then(async resp => {
                if (resp) {
                    return res.status(200).json({
                        status: true,
                        message: "Wallet found.",
                        data: { walletbalance : resp.dataValues.walletbalance}
                    });

                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Items not found."
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    update_wallet_amount = async (req, res) => {
        try {
            let data=req.body;

            await users.findOne({
                where: { id: req.body.user_id }
            }).then(async res_user => {
                if (res_user) {
                    await users.update({ walletbalance:(res_user.dataValues.walletbalance)+ data.walletbalance }, { where: { id: data.user_id }, limit: 1 }).then(async resp => {
                        if (resp) {
                            return res.status(200).json({
                                status: true,
                                message: "Wallet updated."
                            });
        
                        } else {
                            return res.status(200).json({
                                status: false,
                                message: "Opps something went wrong."
                            });
                        }
                    });
                }
            })
            
            
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    get_wallet_history = async (req, res) =>{
        try {
            let data=req.body;
            await wallet_trans.findAll({where:{user_id: data.user_id}}).then(async res_user => {
                if(res_user && res_user.length>0){
                    let wallet_list=[];
                    for (let i = 0; i < res_user.length; i++) {
                        const element = res_user[i].dataValues;
                        let machine_list= await machines.findOne({where:{id:element.machine_id}})
                        element.machine_name =  machine_list.dataValues.machine_name;
                        wallet_list.push(element)
                    }
                    return res.status(200).json({
                        status: true,
                        message: "Wallet transaction found.",
                        data: wallet_list
                    });
                }else{
                    return res.status(200).json({
                        status: false,
                        message: "Wallet transaction not found."
                    });
                }
                
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }   
    } 

    get_all_active_users = async (req, res) =>{
        try {
            let data=req.body;
            await users.findAll({where: { status:1, role:"MEMBER"}}).then(async res_user => {
                if(res_user && res_user.length>0){
                    return res.status(200).json({
                        status: true,
                        message: "Users found.",
                        data: res_user
                    });
                }else{
                    return res.status(200).json({
                        status: false,
                        message: "Users not found."
                    });
                }
                
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }   
    } 

    get_requested_users =   async (req, res) =>{
        try {
            let data=req.body;
            await users.findAll({where: { status:0, role:"MEMBER"}}).then(async res_user => {
                if(res_user && res_user.length>0){
                    return res.status(200).json({
                        status: true,
                        message: "Users found.",
                        data: res_user
                    });
                }else{
                    return res.status(200).json({
                        status: false,
                        message: "Users not found."
                    });
                }
                
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }   
    } 
}


module.exports = new UsersController();