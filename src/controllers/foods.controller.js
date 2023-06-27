const config = require('../../config/config');
//DB DECLARATION
const db = require("../models");
const jwt = require('jsonwebtoken');
const Op = db.Sequelize.Op;

//TABLES DECLARATION
const categories = db.categories;
const items = db.items;
const food_order = db.food_order;
const order_items = db.order_items;
const users = db.users;
const wallet_trans = db.wallet_trans;
const machine = db.machines

//USER CONTROLLER
class CategoryController {

    get_categories = async (req, res) => {
        try {
            await categories.findAll().then(async res_user => {
                if (res_user) {
                    return res.status(200).json({
                        status: true,
                        message: "Category found.",
                        data: res_user
                    });

                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Category not found."
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    get_items = async (req, res) => {
        try {
            let data = req.body;
            await items.findAll({ where: { "category_id": data.category_id, status: 1 } }).then(async resp => {
                if (resp.length > 0) {
                    return res.status(200).json({
                        status: true,
                        message: "Items found.",
                        data: resp
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

    get_all_items = async (req, res) => {
        try {
            let data = req.body;
            await items.findAll({ where: { "category_id": data.category_id } }).then(async resp => {
                if (resp.length > 0) {
                    return res.status(200).json({
                        status: true,
                        message: "Items found.",
                        data: resp
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

    update_item_status = async (req, res) => {
        try {
            let data = req.body;
            await items.update({ status: data.status }, { where: { id: data.item_id }, limit: 1 }).then(async resp => {
                if (resp) {
                    return res.status(200).json({
                        status: true,
                        message: "Item Updated found.",
                        data: resp
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

    create_order = async (req, res) => {
        try {

            let data = req.body;
            let user_data = {};
            if (data.user_id>0) {
                
                user_data = await users.findOne({ where: { id: data.user_id } })
            }
            let food_order_obj = {
                user_id: data.user_id,
                room_id: data.room_id,
                date: data.date,
                tax: data.tax,
                discount: data.discount,
                remark: data.remark,
                special_instruction: data.special_instruction,
                total: data.total
            }
            let item_array = data.items;
            if (data.user_id>0) {
                if (user_data.dataValues.walletbalance >= data.total) {
                    await food_order.create(food_order_obj).then(async res_user => {
                        if (res_user) {
                            await users.update({ walletbalance: user_data.dataValues.walletbalance - food_order_obj.total }, { where: { id: user_data.id }, limit: 1 })
                            await wallet_trans.create({
                                user_id: user_data.dataValues.id,
                                amount: food_order_obj.total,
                                credit_debit: 2,
                                machine_id: 1
                            })
                            let item_array_res = []
                            for (let i = 0; i < item_array.length; i++) {
                                const element = item_array[i];
                                let item_obj = {
                                    food_order_id: res_user.dataValues.id,
                                    item_id: element.item_id,
                                    qty: element.qty,
                                    price: element.price
                                }
                                let item_res = await order_items.create(item_obj);
                                item_array_res.push(item_res.dataValues)
                            }
                            let data = res_user.dataValues
                            data.items = item_array_res
                            return res.status(200).json({
                                status: true,
                                message: "Order Successfully created.",
                                data: data
                            });
                        }
                    });
                } else {
                    return res.status(200).json({ status: false, message: "Please Recharge your wallet." });
                }
            } else {
                await food_order.create(food_order_obj).then(async res_user => {
                    let item_array_res = []
                    for (let i = 0; i < item_array.length; i++) {
                        const element = item_array[i];
                        let item_obj = {
                            food_order_id: res_user.dataValues.id,
                            item_id: element.item_id,
                            qty: element.qty,
                            price: element.price
                        }
                        let item_res = await order_items.create(item_obj);
                        item_array_res.push(item_res.dataValues)
                    }
                    let data = res_user.dataValues
                    data.items = item_array_res
                    return res.status(200).json({
                        status: true,
                        message: "Order Successfully created.",
                        data: data
                    });

                });
            }

        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

    get_order = async (req, res) => {
        try {
            let data = req.body;
            await food_order.findOne({ where: { "user_id": data.user_id, status: 1 } }).then(async resp => {
                if (resp) {
                    let items_array = await order_items.findAll({ where: { "food_order_id": resp.dataValues.id } })
                    console.log("items_array",items_array.length);
                
                    let res_data = resp.dataValues;
                    if(items_array.length>0){
                        for (let i = 0; i < items_array.length; i++) {
                            const element = items_array[i];
                            let item= await items.findOne({where:{id:element.item_id}});
                            items_array[i].dataValues.item_name=item.dataValues.item_name;
                            items_array[i].dataValues.description=item.dataValues.description;
                            items_array[i].dataValues.veg_nonveg=item.dataValues.veg_nonveg;
                            items_array[i].dataValues.category_id=item.dataValues.category_id;
                        }
                    }
                    res_data.items = items_array
                    return res.status(200).json({
                        status: true,
                        message: "Items found.",
                        data: res_data
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

    get_all_order = async (req, res) => {
        try {
            let data = req.body;
            await food_order.findAll({ where: { "status": 1 } }).then(async resp => {
                let res_data = [];
                if (resp.length > 0) {
                    for (let i = 0; i < resp.length; i++) {
                        const element = resp[i].dataValues;
                        let items_array = await order_items.findAll({ where: { "food_order_id": element.id } })
                        if(items_array.length>0){
                            for (let i = 0; i < items_array.length; i++) {
                                const element = items_array[i];
                                let item= await items.findOne({where:{id:element.item_id}});
                                items_array[i].dataValues.item_name=item.dataValues.item_name;
                                items_array[i].dataValues.description=item.dataValues.description;
                                items_array[i].dataValues.veg_nonveg=item.dataValues.veg_nonveg;
                                items_array[i].dataValues.category_id=item.dataValues.category_id;
                            }
                        }
                        element.items = items_array
                        res_data.push(element);
                    }
                    return res.status(200).json({
                        status: true,
                        message: "Orders found.",
                        data: res_data
                    });

                } else {
                    return res.status(200).json({
                        status: false,
                        message: "Orders not found."
                    });
                }
            });
        } catch (error) {
            console.log(error)
            return res.status(200).json({ status: false, message: "Opps something went wrong.", data: error });
        }
    }

}

module.exports = new CategoryController();