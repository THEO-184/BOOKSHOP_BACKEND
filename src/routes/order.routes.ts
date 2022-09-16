import { Router } from "express";
import { createOrderItemsHandler } from "../controllers/order.controller";

const router = Router();

router.route("/").post(createOrderItemsHandler);

export default router;
