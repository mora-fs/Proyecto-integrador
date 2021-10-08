module.exports = (sequelize, dataTypes) => {
    let alias = 'Categories';

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
        tableName: 'categories',
        timestamps: false
    }


    const Category = sequelize.define(alias, cols, config)

    Category.associate = function(models){
        Category.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_categories',
            foreignKey: 'id_categories',
            otherKey: 'id_products',
            timestamps: false
        });
    }

    return Category
}