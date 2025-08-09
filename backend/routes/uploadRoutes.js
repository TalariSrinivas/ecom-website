import express from 'express';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const file = req.files.image;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'ecommerce_uploads'
    });

    // Remove temp file
    fs.unlink(file.tempFilePath, (err) => {
      if (err) console.error('Temp file deletion error:', err);
    });

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
});

export default router;
