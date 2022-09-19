import { RequestHandler } from "express";
import { Unauthorized } from "../errors";
import { Roles } from "../utils/user.types";

const adminMiddleware =
	(...user: Roles[]): RequestHandler =>
	async (req, res, next) => {
		if (!user.includes(req.user.role)) {
			throw new Unauthorized("permission denied");
		}
		next();
	};

export default adminMiddleware;
