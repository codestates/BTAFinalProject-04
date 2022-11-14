import IController from '../interface/IController';

export default class indexController {

    static indexPage : IController = async (req, res) => {    
        res.send("BTA3_PR1_Back Success");
    }

    static errorPage : IController = async (req, res) => {  
        res.send("BTA3_PR1_Back Error");
    }
}