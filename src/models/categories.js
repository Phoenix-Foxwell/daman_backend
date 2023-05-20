module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("tbl_category", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_name:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
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