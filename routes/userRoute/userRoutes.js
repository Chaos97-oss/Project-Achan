import express from 'express'
import signUp from '../../controller/authController/signUp.js';
import {protect, isAdmin} from '../../middleware/authMiddleware.js'
import { getUsers,getUser,updateUser,deleteUser } from '../../controller/userController/userController.js';

const router = express.Router();
//Admin only routes
router.post("/", protect, isAdmin, signUp);
router.get("/", protect, isAdmin, getUsers);
router.get("/:userId", protect, isAdmin, getUser);
router.put("/:userId", protect, isAdmin, updateUser);
router.delete("/:userId", protect, isAdmin, deleteUser);

export default router;