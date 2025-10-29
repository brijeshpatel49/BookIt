import { Router } from 'express';
import { validatePromoCode } from '../controllers/promoController';

const router = Router();

/**
 * @route   POST /api/promo/validate
 * @desc    Validate promo code and calculate discount
 * @access  Public
 */
router.post('/validate', validatePromoCode);

export default router;
