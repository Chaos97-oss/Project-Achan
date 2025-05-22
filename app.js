import express from 'express';
import connectDB from './config/db.js';
import signUp from './controller/authController/signUp.js';
import errorHandler from './middleware/errorMiddelware.js';
import login from './controller/authController/login.js';
import userRoutes from './routes/userRoute/userRoutes.js';
connectDB(); //database config
const app = express();

// Middleware to parse JSON
app.use(express.json());


app.use('/api/v1/users', userRoutes)

app.use(errorHandler);


const PORT = process.env.PORT
app.listen(PORT, ()=>{
  console.log(`Server is Active 🚀 `);
})
