import express from 'express';
import {
  createRoom,
  updateFiles,
  getFiles,
} from '../controllers/databaseControllers.js';

const router = express.Router();

router.get('/createRoom', createRoom);
router.post('/:id', updateFiles);
router.get('/:id', getFiles);
//router.post('/:id', setFile);

export default router;
