module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';

    cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        employee: {
            type: dataTypes.INTEGER
        },
        profileImage: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: 'users',
        timestamps: false
    }


    const User = sequelize.define(alias, cols, config)


    return User
}