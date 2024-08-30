import express from "express";
import rateLimit from "express-rate-limit";
import ExemploController from "../controllers/ExemploController";
import Config from "../config/Config";
const router = express.Router();

router.get('/all', rateLimit(Config.configRateLimit(20, 30)), ExemploController.getAllExemplo);
router.get('/', rateLimit(Config.configRateLimit(20, 30)), ExemploController.getExemploByID);
router.post('/insert', rateLimit(Config.configRateLimit(20, 30)), ExemploController.createExemplo);
router.patch('/update', rateLimit(Config.configRateLimit(20, 30)), ExemploController.updateExemploByID);
router.delete('/delete', rateLimit(Config.configRateLimit(20, 30)), ExemploController.deleteExemploByID);

export default router;