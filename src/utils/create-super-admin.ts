import { CustomError } from "../errors";
import User from "../models/auth.model";
import { Roles } from "./user.types";

class AdminExistsError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export const createSuperAdmin = async (username: string, password: string) => {
	const isUserALreadyExists = await User.findOne({ role: Roles.admin });
	if (isUserALreadyExists) {
		throw new AdminExistsError("admin already exists");
	}
	const user = await User.create({ username, password, role: Roles.admin });
	return user;
};
