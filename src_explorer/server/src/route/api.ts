import express from "express";
import BlockController from '../controller/blockController';
import TransactionController from '../controller/transactionController';

const router = express.Router();

router.get                     ("/block/select", BlockController.select);
router.get                     ("/block/list", BlockController.list);
router.get                     ("/transaction/select", TransactionController.select);
router.get                     ("/transaction/list", TransactionController.list);

export = router;