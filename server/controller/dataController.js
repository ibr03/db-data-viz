import { Op } from "sequelize";
import DataModel from "../models/dataModel.js";

const dataController = async (req, res) => {
    const { query } = req.query;
    const results = await DataModel.findAll({
        where: {
            patent_text: {
                [Op.iLike]: `%${query}%`, // case insensitive search
            },
        },
    });

    res.json(results);
}

export default dataController;