import express from "express";
import {getEventController ,  postEventController} from "../controllers/EventControllers.js";

const router = express.Router();

router.get("/events" ,getEventController);
export default router;