import {Model, DataTypes} from "sequelize";
import sequelize from "../config/db.mjs";

class Producto extends Model{}

Producto.init(
    {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
},
{
    sequelize, 
    modelName: "Producto",
    tableName: "productos",
    timestamps: true,
    underscored: true,
}
);

export default Producto;





