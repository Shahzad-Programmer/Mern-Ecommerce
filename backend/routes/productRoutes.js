import express from "express";
import { addProduct, deleteProductController,realtedProductController,searchProductController, getProductController, getSingleProductController, updateProductController, productCategoryController, getAllproducts, stripeController } from "../controller/productController.js";
import { requireSignIn } from "../Middlewares/verifyToken.js";

const productRouter = express.Router();
productRouter.post("/create",requireSignIn,addProduct)
productRouter.put("/:id",requireSignIn,updateProductController)
productRouter.get("/get-products",getProductController)
productRouter.get("/get-all-products",getAllproducts)
productRouter.get("/product/:slug",getSingleProductController)
productRouter.delete("/:id",deleteProductController)
productRouter.get("/search", searchProductController);
//payments route
productRouter.post('/create-checkout-session',stripeController)

//similar product
productRouter.get("/related-product/:pid/:cid", realtedProductController);
productRouter.get("/product-category/:slug", productCategoryController);

export default productRouter;