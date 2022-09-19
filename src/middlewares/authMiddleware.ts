import { NextFunction, Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors";
import { Roles } from "../utils/user.types";

export const authMiddleware: RequestHandler = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new Unauthenticated("user not authenticated");
	}
	const token = authHeader.split(" ")[1];
	console.log("token", token);
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
			username: string;
			id: string;
			role: Roles;
		};
		req.user = decodedToken;
		next();
	} catch (error) {
		throw new Unauthenticated("user not authenticated");
	}
};
