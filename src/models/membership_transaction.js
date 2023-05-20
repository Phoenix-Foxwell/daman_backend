module.exports = (sequelize, Sequelize) => {
    const MembershipTransaction = sequelize.define("tbl_membership_trans", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        membershiptype_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        amount:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        start_date:{
            type: 'DATE',
            allowNull: false,
            default: Sequelize.literal('GETDATE')
        },
        end_date:{
            type: 'DATE',
            allowNull: false,
            default: Sequelize.literal('GETDATE')
        },
        payment_type: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        paymentref: {
            type: Sequelize.STRING(255),
            allowNull: true
        },
        card_no: {
            type: Sequelize.STRING(255),
            allowNull: true
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

    return MembershipTransaction;
};