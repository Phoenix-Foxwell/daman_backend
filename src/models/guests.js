module.exports = (sequelize, Sequelize) => {
    const Guests = sequelize.define("tbl_guest", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        mobile_no:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: '0'
        },
        name:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        visitdate:{
            type: 'DATE',
            allowNull: false,
            default: Sequelize.literal('GETDATE')
        },
        membership_id:{
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

    return Guests;
};