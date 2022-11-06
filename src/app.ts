import app from "./config/express";

const port:number = Number(3200);
app.listen(port,async() => {
    console.log(`Server listening on port: ${port}`);
});    