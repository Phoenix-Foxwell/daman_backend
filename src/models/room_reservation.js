module.exports = (sequelize, Sequelize) => {
    const RoomReservation = sequelize.define("tbl_room_reservation", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        room_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        from_date:{
            type: 'DATE',
            allowNull: false,
            default: Sequelize.literal('GETDATE')
        },
        to_date:{
            type: 'DATE',
            allowNull: false,
            default: Sequelize.literal('GETDATE')
        },
        quantity:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
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

    return RoomReservation;
};