import { Request, Response } from 'express';
import PromoCode from '../models/PromoCode';

/**
 * Validate promo code and calculate discount
 * POST /api/promo/validate
 */
export const validatePromoCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code, originalPrice } = req.body;

    // Validate required fields
    if (!code || typeof code !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Promo code is required and must be a string'
      });
      return;
    }

    if (!originalPrice || typeof originalPrice !== 'number' || originalPrice <= 0) {
      res.status(400).json({
        success: false,
        message: 'Original price is required and must be a positive number'
      });
      return;
    }

    // Find promo code (case-insensitive)
    const promoCode = await PromoCode.findOne({ 
      code: code.trim().toUpperCase() 
    });

    if (!promoCode) {
      res.status(400).json({
        success: false,
        message: 'Invalid promo code'
      });
      return;
    }

    // Check if promo code is valid (active and not expired)
    if (!promoCode.isValid()) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired promo code'
      });
      return;
    }

    // Calculate discount amount
    const discountAmount = promoCode.calculateDiscount(originalPrice);

    res.status(200).json({
      success: true,
      data: {
        code: promoCode.code,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue,
        discountAmount: discountAmount
      },
      message: 'Promo code applied successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to validate promo code'
    });
  }
};
