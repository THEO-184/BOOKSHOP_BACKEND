import { Router } from "express";
import {
	createOrderItemsHandler,
	getAllOrders,
	myOrdersHandler,
} from "../controllers/order.controller";
import adminMiddleware from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Roles } from "../utils/user.types";

const router = Router();

router.route("/").post(createOrderItemsHandler).get(myOrdersHandler);

router.route("/admin").get(adminMiddleware(Roles.admin), getAllOrders);

export default router;
