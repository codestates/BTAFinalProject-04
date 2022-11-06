import IController from '../interface/IController';
import fs from 'fs'
import ApiResponse from '../../src/utility/apiResponse';
import logger from '../../src/config/logger';

export default class indexController {

    static indexPage: IController = async (req, res) => {
        res.send("Harmony Explorer Back Success");
    }

    static errorPage: IController = async (req, res) => {
        res.send("Harmony Explorer Back Error");
    }

    static imgs: IController = async (req, res) => {
        const { src } = req.params;

        try {
            const data = await fs.readFileSync(src);
            res.end(data);
        } catch (error) {
            logger.error(error);
            ApiResponse.error(res, error);
        }
    };
}