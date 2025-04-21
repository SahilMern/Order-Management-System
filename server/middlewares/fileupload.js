import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allowed image types
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, JPG, and WEBP images are allowed"));
    }
    cb(null, true);
  },
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB max size
      files: 1 // Only 1 file
    }
});
