import { Router } from "express";
import {
	createCartHandler,
	viewCartHandler,
	updateCartHandler,
	deleteAllCartItemsHandler,
	deleteCartItemHandler,
} from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.route("/").post(authMiddleware, createCartHandler);

router
	.route("/my-orders")
	.get(authMiddleware, viewCartHandler)
	.delete(authMiddleware, deleteAllCartItemsHandler);
router
	.route("/my-orders/:id")
	.put(authMiddleware, updateCartHandler)
	.delete(authMiddleware, deleteCartItemHandler);

export default router;
