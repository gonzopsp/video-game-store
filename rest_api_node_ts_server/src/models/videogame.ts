
import { Model, DataTypes } from 'sequelize'
import db from '../config/db'; 

export class Videogame extends Model {
    public id!: number; 
    public genre!: number;
    public name!: string; 
    public description!: string; 
    public image!: string; 
    public price!: number; 
    public stock!: number; 


}


Videogame.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        genre: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(2020),
            allowNull: true, 
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true, 
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
    },
    {
        sequelize: db, 
        tableName: 'videogame', 
        timestamps: false
    }
);