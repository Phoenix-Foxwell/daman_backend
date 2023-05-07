module.exports = (sequelize, Sequelize) => {
    const OrderItems = sequelize.define("tbl_order_items", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        food_order_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        qty:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
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

    return OrderItems;
};