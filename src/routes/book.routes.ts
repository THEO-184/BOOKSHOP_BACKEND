import { Router } from "express";
import {
	createBookHandler,
	deleteBookHandler,
	editBookHandler,
	getAllBooks,
} from "../controllers/user.controller";
import adminMiddleware, { Roles } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router
	.route("/")
	.post(authMiddleware, adminMiddleware(Roles.admin), createBookHandler)
	.get(getAllBooks);

router
	.route("/:id")
	.put(authMiddleware, adminMiddleware(Roles.admin), editBookHandler)
	.delete(authMiddleware, adminMiddleware(Roles.admin), deleteBookHandler);

export default router;
