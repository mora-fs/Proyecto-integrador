module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';

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
        category_id: dataTypes.INTEGER
    };

    let config = {
        tableName: 'products',
        timestamps: false
    }


    const Product = sequelize.define(alias, cols, config)
/* 
   
    Product.associate = function(models) {
        Product.belongsToMany(models.Brands, {
            as: 'brands',
            through: 'products_brands',
            foreignKey: 'id_product',
            otherKey: 'id_brand',
            timestamps: false
        }); */

    Product.associate = function(models) {
        Product.belongsToMany(models.Category, {
            as: 'category',
            through: 'products_categories',
            foreignKey: 'id_product',
            otherKey: 'id_categories',
            timestamps: false
        });
    }

    return Product
}