module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("tbl_users", {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        email:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        mobile_no:{
            type: Sequelize.STRING(255),
            allowNull: false
        },
        role:{
            type: Sequelize.ENUM,
            values: ['ADMIN', 'ACCOUNTANT'],
            defaultValue:'ADMIN'
        },
        dob:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        access_code: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        relation:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        membershipuserid:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        status:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        walletbalance:{
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

    return Users;
};