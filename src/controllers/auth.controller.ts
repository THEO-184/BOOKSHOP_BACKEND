import { createJwt } from "./../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import User from "../models/auth.model";
import { UserDocument } from "../utils/user.types";
import { BadRequestErr, NotFound, Unauthenticated } from "../errors";
import { createUser, loginUser } from "../services/auth.services";

export const registerHandler: RequestHandler<{}, {}, UserDocument> = async (
	req,
	res
) => {
	const user = await createUser(req.body);

	res
		.status(StatusCodes.CREATED)
		.json({ user: { username: user.username, id: user._id, role: user.role } });
};

export const loginHandler: RequestHandler<{}, {}, UserDocument> = async (
	req,
	res
) => {
	const { username, password } = req.body;

	const user = await loginUser({ username, password });

	const payload = { username: user.username, id: user._id, role: user.role };
	const token = createJwt(payload);

	res
		.status(StatusCodes.OK)
		.json({ user: { username: user.username, id: user._id }, token });
};
