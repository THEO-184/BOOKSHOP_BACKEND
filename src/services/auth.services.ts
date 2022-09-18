import { RequestHandler } from "express";
import { DocumentDefinition } from "mongoose";
import { BadRequestErr, Unauthenticated } from "../errors";
import User from "../models/auth.model";
import { UserDocument, UserInput } from "../utils/user.types";

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
	const { username, password } = input;
	if (!username || !password) {
		throw new BadRequestErr("provide email and password");
	}
	const user = await User.create(input);
	return user;
};

export const loginUser = async (
	input: DocumentDefinition<Pick<UserDocument, "username" | "password">>
) => {
	const { username, password } = input;
	if (!username || !password) {
		throw new BadRequestErr("provide email and password");
	}
	const user = await User.findOne({ username });
	if (!user) {
		throw new Unauthenticated("not authenticated");
	}

	const isPasswordMatch = await user.comparePassword(password);
	if (!isPasswordMatch) {
		throw new Unauthenticated("not authenticated");
	}
	return user;
};
