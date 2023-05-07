module.exports = (sequelize, Sequelize) => {
    const ChatMessages = sequelize.define("tbl_chat_messages", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        sender: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        receiver: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        message:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        is_read:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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

    return ChatMessages;
};