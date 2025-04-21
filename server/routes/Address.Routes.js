import express from 'express';
import {
  createAddress,
  getAddresses,
  updateAddress,
  setDefaultAddress,
  deleteAddress
} from '../controllers/Address.Controller.js';
import { authenticate } from '../middlewares/Auth.js';

const router = express.Router();

// Create new address
router.post('/', authenticate, createAddress);

// Get all addresses for user
router.get('/', authenticate, getAddresses);

// Update address
router.put('/:id', authenticate, updateAddress);

// Set default address
router.patch('/:id/default', authenticate, setDefaultAddress);

// Delete address
router.delete('/:id', authenticate, deleteAddress);

export default router;