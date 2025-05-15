import express from 'express';
import connectDB from './config/db.js';
// dotenv.config()
connectDB(); //database config
const app = express();





app.listen(5000, ()=>{
  console.log(`Server is Active 🚀 `);
})