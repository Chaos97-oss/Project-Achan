import express from 'express';
import connectDB from './config/db.js';
import signUp from './controller/authController/signUp.js';
import errorHandler from './middleware/errorMiddelware.js';
import login from './controller/authController/login.js'
connectDB(); //database config
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post('/api/signUp', signUp);

app.post('/api/login', login)

app.use(errorHandler);


const PORT = process.env.PORT
app.listen(PORT, ()=>{
  console.log(`Server is Active 🚀 `);
})
