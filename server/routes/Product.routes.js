import express from "express";
const router = new express.Router();
import { upload } from "../middlewares/fileupload.js";
import {
  addProduct,
  deleteProduct,
  updateProductFields,
  updateProductImage,
  getAllProduct,
  getSingleProduct,
  productsdata,
} from "../controllers/Product.Controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/Auth.js";

//TODO:-Product CRUD Operation

router.post(
  "/addproduct",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  addProduct
); //? Creating Products

router.get("/getproducts", authenticate, authorizeAdmin,getAllProduct); //? Get All Products
router.put("/updateproduct/:id", updateProductFields); //? Update Products Field
router.put("/updateimage/:id", upload.single("image"), updateProductImage); //? Update Image Only
router.delete("/:id",authenticate,authorizeAdmin, deleteProduct); //? Delete Product

router.get("/getproduct/:id", getSingleProduct); //? Get Single Product
router.get("/getall", productsdata); //? Comman page for user

export default router;
