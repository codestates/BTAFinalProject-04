import app from "./config/express";
import BlockService from "./service/blockService";
import TransactionService from "./service/transactionService";

const port:number = Number(3200);
app.listen(port,async() => {
    console.log(`Server listening on port: ${port}`);
});    

// setTimeout(() => {
//     // TransactionService.updateTransactionList();
//     BlockService.updateBlockList();
// }, 30 * 1000);