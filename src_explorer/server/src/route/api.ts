import express from "express";
import BlockchainController from '../controller/blockchainController';

const router = express.Router();

router.get                     ("/blockchain", BlockchainController.select);
router.get                     ("/blockchain/blockinfo", BlockchainController.blockInfo);

export = router;