import jwt from "jsonwebtoken";
import { Roles } from "./user.types";

export const createJwt = (payload: {
	name: string;
	id: string;
	role: Roles;
}) => {
	const privateKey = "!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+Mb";
	const token = jwt.sign(payload, privateKey);
	return token;
};
