import express from 'express';
import connectDB from './config/db.js';

connectDB(); //database config
const app = express();




const PORT = process.env.PORT
app.listen(PORT, ()=>{
  console.log(`Server is Active 🚀 `);
})
