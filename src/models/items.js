module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("tbl_items", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        item_name:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        description:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        status:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        veg_nonveg:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "1-VEG, 2-NONVEG"
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

    return Categories;
};