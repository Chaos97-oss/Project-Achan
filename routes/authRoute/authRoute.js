import signUp from "../../controller/authController/signUp";
import login from "../../controller/authController/login";
import router from "../userRoute/userRoutes";


app.post('/api/signUp', signUp);//general loign route
app.post('/api/login', login);//general signup route

export default router;