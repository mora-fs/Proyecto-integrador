module.exports = (sequelize, dataTypes) => {
    let alias = 'Brands';

    cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: 'brands',
        timestamps: false
    }


    const Brand = sequelize.define(alias, cols, config)

    Brand.associate = function(models){
        Brand.belongsToMany(models.Products, {
            as: 'products',
            through: 'products_brands',
            foreignKey: 'id_brand',
            otherKey: 'id_product',
            timestamps: false
        });

    }

    return Brand
}