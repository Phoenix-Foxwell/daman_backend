const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const jwt = require('jsonwebtoken');

//TABLES DECLARATION
const users = db.users;
const messages= db.messages;

class socketController {
    //init method invoked once you create object of socket controller class
    constructor(name, io) {
        //socket configurations
        io.sockets.use(async function (socket, next) {
            if (socket.handshake.query) {
                let AccessToken = socket.handshake.headers.authorization;
                if(!AccessToken) {
                    return next(new Error('Not authenticate'));
                }
                let udata =  await jwt.verify(AccessToken,config.secret, { algorithm: "HS256" });
                if(udata) {
                    let user = await users.findOne({where : { id: udata.id} } );
                    if (user) {
                        socket.emit("user_online_alert",{ _id: user.id,is_online:1 });
                        next();
                    } else {
                        next(new Error('Authentication error 1'));
                    }
                } else {
                    next(new Error('Authentication error 2'));
                }
            } else {
                next(new Error('Authentication error 3'));
            }
        }).on('connection',(socket) => {
            this.listenOnSocket(socket,io);
        })
    }
    //listening event once invoked init method
    listenOnSocket = (socket,io) => {
        /*
            {
                "sender": "",
                "receiver": "",
                "message_type" : "",
                "message": "",
            }
        */
        socket.on('sendMessage', async (data) => {
            let dbdata = await this.storeMessages(data);
            io.emit(data.receiver,dbdata);
        });
        /*
         {
            sender: "",
            receiver:""
         }
        */
        socket.on("readMessage",(data) => {
            this.readAllMessages(data);
            io.emit("readMessageEvent",data)
        });

        /*
            {
                "user_id" : "",
                "group_id" : "",
                "message_type": "",
                "message": ""
            }
        */
        

    }
   
    //store message in database for one to one chat
    storeMessages = async (data) => {
         let msg = {
            receiver: data.receiver,
            sender: data.sender,
            message_type: data.message_type,
            message: data.message
         };
       return await messages.create(msg);
    }
    //read all message once user invoke this method
    // readAllMessages =async (data) => {
    //    var a= await message.updateMany({sender: data.receiver,is_read: false},{is_read: true});
    //    console.log(a);
    // }
    // store message in database for group chat
   
    
}

//export socket controller class
module.exports = socketController;