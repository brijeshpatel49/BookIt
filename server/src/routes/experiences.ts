import { Router } from 'express';
import { getAllExperiences, getExperienceById } from '../controllers/experiencesController';

const router = Router();

/**
 * @route   GET /api/experiences
 * @desc    Get all experiences
 * @access  Public
 */
router.get('/', getAllExperiences);

/**
 * @route   GET /api/experiences/:id
 * @desc    Get single experience by ID
 * @access  Public
 */
router.get('/:id', getExperienceById);

export default router;
