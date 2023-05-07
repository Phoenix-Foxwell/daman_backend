module.exports = (sequelize, Sequelize) => {
    const Machines = sequelize.define("tbl_machine", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        machine_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "1-DYNAMIC, 2-STATIC"
        },
        machine_name:{
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

    return Machines;
};