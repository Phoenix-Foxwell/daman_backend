module.exports = (sequelize, Sequelize) => {
    const MembershipMaster = sequelize.define("tbl_membership_master", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        membership_type: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        membership_amt:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        membership_period:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        description:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        no_of_family_member:{
            type: Sequelize.STRING(255),
            allowNull: false,
            default: 0
        },
        status:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
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

    return MembershipMaster;
};