import express from "express";
import rateLimit from "express-rate-limit";
import ModalityController from "../controllers/ModalityController";
import Config from "../config/Config";
import { verifyToken } from "../token";
const router = express.Router();

router.get('/all', rateLimit(Config.configRateLimit(50, 15)), verifyToken, ModalityController.getAllModality);
router.get('/find', rateLimit(Config.configRateLimit(50, 15)), verifyToken, ModalityController.getModalityByID);
router.post('/insert', rateLimit(Config.configRateLimit(50, 15)), verifyToken, ModalityController.createModality);

export default router;