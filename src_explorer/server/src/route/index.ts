import express from "express";
const router = express.Router();

import indexController from "../controller/index";

router.get("/", indexController.indexPage);
router.get("/error", indexController.errorPage)
router.get("/imgs/:src", indexController.imgs)
export = router;