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
    get_message_list = async (req, res) =>{
        try {
            let params=req.body
            let udata=params.user_id;
            let chat_history = await db.sequelize.query(`SELECT * 
                FROM tbl_chat_messages
                where (sender=  ` + params.user_id + ` or receiver= ` + params.user_id + `)
                group by sender,receiver`, {
                type: db.Sequelize.QueryTypes.SELECT
            });
            if (chat_history.length > 0) {
                let ids = await this.getIds(chat_history, params.user_id)
                let message_count = await db.sequelize.query(`select id from (select *,(SELECT JSON_OBJECT('message',message,'last_time',created_at,'is_read',(if(sender=` + udata + `,1,is_read))) from tbl_chat_messages where (sender =` + udata + ` and receiver=tbl_users.id) or (receiver=` + udata + ` and sender=tbl_users.id) order by created_at desc limit 1) as last_message
                    from tbl_users
                    where id in (` + ids + `))abc where JSON_EXTRACT(last_message, '$.is_read')=0
                    order by JSON_EXTRACT(last_message, '$.last_time') desc`, {
                        type: db.Sequelize.QueryTypes.SELECT
                    });
                console.log("message_count",message_count.length);
                let chat_list = await db.sequelize.query(`select * from (select *,(SELECT JSON_OBJECT('message',message,'last_time',created_at,'is_read',(if(sender=` + udata + `,1,is_read))) from tbl_chat_messages where (sender =` + udata + ` and receiver=tbl_users.id) or (receiver=` + udata + ` and sender=tbl_users.id) order by created_at desc limit 1) as last_message
                from tbl_users
                where id in (` + ids + `))abc
                order by JSON_EXTRACT(last_message, '$.last_time') desc`, {
                    type: db.Sequelize.QueryTypes.SELECT
                });
                console.log("message_count",chat_list);

                if (chat_list.length>0) {
                    return res.status(200).json({
                            status: true,
                            message: "Users found.",
                            data: chat_list
                        });
                    
                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Users not found."
                    });
                }
            }else {
                    return res.status(200).json({
                        status: false,
                        message: "Messages not found."
                    });
                }
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }   
    }
    //FOR GET USER IDS FROM CHAT-MESSAGE
    getIds = async (list, user) => {
        if (list.length > 0) {
            let ids = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].sender != user) {
                    if (ids.includes(list[i].sender) == false) {
                        ids.push(list[i].sender)
                    }
                } else if (list[i].receiver != user) {
                    if (ids.includes(list[i].receiver) == false) {
                        ids.push(list[i].receiver)
                    }
                }
            }
            let idsObj = []
            for (let j = 0; j < ids.length; j++) {
                idsObj.push(ids[j]);
            }
            return idsObj;
        } else {
            return [];
        }
    }
    get_messages_for_manager = async (req, res) =>{
        try {
            await messages.findAll({
                where: {[Op.or]:[{[Op.and]: [
                    { sender: req.body.user_id }, 
                    { receiver: req.body.list_user_id }
               ]},{[Op.and]: [
                { sender: req.body.list_user_id }, 
                { receiver: req.body.user_id }
           ]}]}
            }).then(async res_user => {
                if (res_user.length>0) {
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