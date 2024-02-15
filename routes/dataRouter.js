import { Router } from 'express';
import {
  getData,
  postData,
  deleteData,
  updateData,
  getSingleData,
} from '../controllers/dataController.js';

const router = Router();

router.get('/', getData);
router.get('/:id', getSingleData);
router.post('/create', postData);
router.delete('/delete/:id', deleteData);
router.put('/update/:id', updateData);

export default router;
