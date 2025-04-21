import { Product } from "../models/product.model.js";
import { CloudinaryDataUri } from "../utils/CloudinaryUri.js";
import { v2 as cloudinary } from "cloudinary";
import {
  sendErrorResponse,
  sendSuccessResponse,
  validateFields,
} from "../utils/errorHandler.js";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

//TODO:- CREATE NEW PRODUCTS
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    // Validate required fields
    const fieldErrors = validateFields(req.body, [
      "name",
      "description",
      "price",
      "category",
      "quantity",
    ]);

    if (fieldErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
    }

    // Validate numeric fields
    if (isNaN(price) || isNaN(quantity)) {
      return sendErrorResponse(res, 400, "Price and quantity must be numbers");
    }

    if (!req.file) {
      return sendErrorResponse(res, 400, "Product image is required");
    }

    // Upload image to Cloudinary
    let imageUrl;
    try {
      const dataURI = await CloudinaryDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "ecommerce-products",
      });
      imageUrl = uploadResult.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return sendErrorResponse(res, 500, "Failed to upload product image");
    }

    const lowerCaseCategory = category.toLowerCase();
    //? Create new product
    const product = new Product({
      name,
      description,
      price,
      category: lowerCaseCategory,
      quantity,
      image: imageUrl,
      createdBy: req.user._id,
    });

    const createdProduct = await product.save();
    return sendSuccessResponse(res, 201, "Product created successfully", {
      product: createdProduct,
    });
  } catch (error) {
    console.error("Add product error:", error);
    return sendErrorResponse(res, 500, "Failed to add product");
  }
};

//TODO:- GET ALL PRODUCTS
export const getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { search, minPrice, maxPrice, startDate, endDate } = req.query;

    const filter = {}; //? Object leke filter karunga agar optional data hua to

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return sendSuccessResponse(res, 200, "Products fetched successfully", {
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return sendErrorResponse(res, 500, "Failed to fetch products");
  }
};

export const productsdata = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const { search, minPrice, maxPrice, category } = req.query;
    console.log(category, "category");

    const filter = {};

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Category filter
    if (category) {
      filter.category = category.toLowerCase();
    }

    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return sendSuccessResponse(res, 200, "Products fetched successfully", {
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages: Math.ceil(totalProducts / limit),
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return sendErrorResponse(res, 500, "Failed to fetch products");
  }
};

//TODO:- GET SINGLE PRODUCTS
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    return sendSuccessResponse(res, 200, "Product fetched successfully", {
      product,
    });
  } catch (error) {
    console.error("Get single product error:", error);
    return sendErrorResponse(res, 500, "Failed to fetch product");
  }
};

//TODO:- UPDATE ONLY  PRODUCTS FIELD (Like name, quantity and more)
export const updateProductFields = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "iiis");

    const { name, description, price, category, qunatity } = req.body;

    if (!name && !description && !price && !category && !qunatity) {
      return sendErrorResponse(
        res,
        400,
        "At least one field must be provided for update"
      );
    }

    if (price && isNaN(price)) {
      return sendErrorResponse(res, 400, "Price must be a number");
    }
    if (qunatity && isNaN(qunatity)) {
      return sendErrorResponse(res, 400, "Quantity must be a number");
    }

    const product = await Product.findById(id);

    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (qunatity) product.quantity = qunatity;

    const updatedProduct = await product.save();
    return sendSuccessResponse(res, 200, "Product updated successfully", {
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product fields error:", error);
    return sendErrorResponse(res, 500, "Failed to update product");
  }
};

//TODO:- UPDATE PRODUCTS IMAGE
export const updateProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return sendErrorResponse(res, 400, "No image provided");
    }

    const product = await Product.findById(id);
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    if (product.image) {
      try {
        const publicId = product.image
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error("Failed to delete old image:", deleteError);
      }
    }

    let imageUrl;
    try {
      const dataURI = await CloudinaryDataUri(req.file);
      const uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "ecommerce-products",
      });
      imageUrl = uploadResult.secure_url;
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);
      return sendErrorResponse(res, 500, "Failed to upload new image");
    }

    product.image = imageUrl;
    const updatedProduct = await product.save();

    return sendSuccessResponse(res, 200, "Product image updated successfully", {
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product image error:", error);
    return sendErrorResponse(res, 500, "Failed to update product image");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }

    if (product.image) {
      try {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`ecommerce-products/${publicId}`);
      } catch (deleteError) {
        console.error("Failed to delete product image:", deleteError);
      }
    }

    await Product.deleteOne({ _id: product._id });
    return sendSuccessResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    console.error("Delete product error:", error);
    return sendErrorResponse(res, 500, "Failed to delete product");
  }
};
