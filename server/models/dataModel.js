import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

const DataModel  = sequelize.define("dataModel", {
    idx: { type: DataTypes.INTEGER, primaryKey: true },
    idx2: { type: DataTypes.INTEGER },
    patent_id: { type: DataTypes.INTEGER, unique: true },
    patent_text: { type: DataTypes.TEXT },
    phase: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE },
});

export default DataModel;