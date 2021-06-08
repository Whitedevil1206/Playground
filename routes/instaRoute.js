import express from 'express';
import { getfile, setfile } from '../controllers/instaControllers.js';

const router = express.Router();

router.get('/:id', getfile);
router.post('/:id', setfile);

export default router;
