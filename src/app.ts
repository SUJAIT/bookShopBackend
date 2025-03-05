import express, { Request, Response } from "express"
import router from "./routes";




const app = express();

//middleware ata use route k bola dai ja jeson data dila ta resived koro..
app.use(express.json())


// ++++
//Route Add
app.use('/api',router);
// ----

//ata akta meddlware ata server runn hossa tar respons ta pattassa apadoto
app.get('/',(req:Request,res:Response)=>{
    res.send({
        status:true,
        message:"The Server Running Port 5000"
        })
})


export default app;