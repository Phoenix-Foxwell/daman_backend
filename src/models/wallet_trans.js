module.exports = (sequelize, Sequelize) => {
    const WalletTransaction = sequelize.define("tbl_wallet_txn", {
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
        amount:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: '0'
        },
        date_time:{
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        credit_debit: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "1-CREDIT, 2-DEBIT"
        },
        payment_ref:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        machine_id:{
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

    return WalletTransaction;
};