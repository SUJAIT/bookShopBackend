
import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";



const port = 5000

async function server() {

    try {

        await mongoose.connect(config.database_url as string);

        app.listen(port, () => {
            console.log(`server is Running a ${port}`)
        })

    } catch (error) {
        console.error(error)
    }


}

server()