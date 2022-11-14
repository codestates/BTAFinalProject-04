import app from "./config/express";
import BlockService from "./service/blockService";

const port:number = Number(3200);
app.listen(port,async() => {
    console.log(`Server listening on port: ${port}`);
});    

setInterval(() => {
    BlockService.updateBlockList();
}, 30 * 100);