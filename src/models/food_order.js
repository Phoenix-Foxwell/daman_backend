module.exports = (sequelize, Sequelize) => {
    const FoodOrder = sequelize.define("tbl_food_order", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        room_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        date:{
            type: 'TIMESTAMP',
            allowNull: false,
            default: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        tax:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        total:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        discount:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        remark:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        special_instruction:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        status:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "1-CONFIRM, 2-DONE, 3-ACCEPT"
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, { timestamps: false });

    return FoodOrder;
};