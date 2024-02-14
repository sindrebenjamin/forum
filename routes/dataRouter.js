import { Router } from 'express';
import {
  getData,
  postData,
  deleteData,
  updateData,
} from '../controllers/dataController.js';

const router = Router();

router.get('/', getData);
router.post('/create', postData);
router.delete('/delete/:id', deleteData);
router.put('/update/:id', updateData);

export default router;
