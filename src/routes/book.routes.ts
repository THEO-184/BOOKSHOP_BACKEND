import { Router } from "express";
import {
	createBookHandler,
	deleteBookHandler,
	editBookHandler,
	getBooksHandler,
} from "../controllers/book.controller";
import adminMiddleware from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Roles } from "../utils/user.types";

const router = Router();

router
	.route("/")
	.post(authMiddleware, adminMiddleware(Roles.admin), createBookHandler)
	.get(getBooksHandler);

router
	.route("/:id")
	.put(authMiddleware, adminMiddleware(Roles.admin), editBookHandler)
	.delete(authMiddleware, adminMiddleware(Roles.admin), deleteBookHandler);

export default router;
