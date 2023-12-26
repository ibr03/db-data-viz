import { Router } from 'express';
import dataController from '../controller/dataController.js';
import dataProcessor from '../controller/dataProcessor.js';

const router = Router();

router.get('/data', dataController);

router.get('/data-visualization', dataProcessor);

export default router;