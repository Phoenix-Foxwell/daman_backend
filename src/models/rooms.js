module.exports = (sequelize, Sequelize) => {
    const Rooms = sequelize.define("tbl_rooms", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        price:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        no_of_bed:{
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        description:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        roomtype:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        photo1:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        photo2:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        photo3:{
            type: Sequelize.STRING(255),
            allowNull: false,
            defaultValue: ''
        },
        status:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        qty:{
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

    return Rooms;
};