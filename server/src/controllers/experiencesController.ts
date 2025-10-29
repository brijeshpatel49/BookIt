import { Request, Response } from 'express';
import Experience from '../models/Experience';
import mongoose from 'mongoose';

/**
 * Get all experiences
 * GET /api/experiences
 */
export const getAllExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    const experiences = await Experience.find().select('-__v');
    
    // Sort experiences: Indian locations first, then others
    const indianLocations = ['Bangalore', 'Coorg', 'Udupi', 'Sunderban', 'Manali', 'Karnataka', 'India'];
    const sortedExperiences = experiences.sort((a, b) => {
      const aIsIndian = indianLocations.some(loc => a.location.includes(loc));
      const bIsIndian = indianLocations.some(loc => b.location.includes(loc));
      
      if (aIsIndian && !bIsIndian) return -1;
      if (!aIsIndian && bIsIndian) return 1;
      return 0;
    });
    
    res.status(200).json({
      success: true,
      data: sortedExperiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experiences'
    });
  }
};

/**
 * Get single experience by ID
 * GET /api/experiences/:id
 */
export const getExperienceById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
      return;
    }

    const experience = await Experience.findById(id).select('-__v');

    if (!experience) {
      res.status(404).json({
        success: false,
        message: 'Experience not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience'
    });
  }
};
