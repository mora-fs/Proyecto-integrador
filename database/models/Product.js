const Sequelize = require('sequelize')

module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';

    cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        description: {
            type: dataTypes.STRING(400)
        },
        discount: {
            type: dataTypes.INTEGER
        },
        capacity: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        category_id: {
            type: dataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'products',
        timestamps: false
    }


    const Product = sequelize.define(alias, cols, config)

   
    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'
        })
    }
   

    return Product
}