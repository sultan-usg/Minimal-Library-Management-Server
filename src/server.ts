import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x9muexx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to MongoDB!!");
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()