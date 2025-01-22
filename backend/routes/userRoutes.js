import express from "express";
import { loginUser,  signupUser, updateUser,getAlluser } from "../controller/authController.js"
import {requireSignIn} from "../Middlewares/verifyToken.js"

const userRoute = express.Router();
userRoute.post("/register",signupUser);
userRoute.post("/login",loginUser);

userRoute.put("/updateUser/:id",updateUser);
userRoute.get("/get-users",getAlluser)
//protected User route auth
userRoute.get("/user-auth",requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });
export default userRoute