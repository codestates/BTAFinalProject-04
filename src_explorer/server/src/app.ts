import app from "./config/express";
import Web3Util from "./utility/web3Util";

const port:number = Number(3200);
app.listen(port,async() => {
    console.log(`Server listening on port: ${port}`);
});    

setTimeout(() => {
    Web3Util.updateBlockList();
}, 1 * 1000);