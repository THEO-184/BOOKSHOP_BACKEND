import mongoose from "mongoose";
import express from "express";
import * as UserService from "../services/auth.services";
import request from "supertest";
import authRoutes from "../routes/auth.routes";
import bodyParser from "body-parser";
import { createJwt } from "../utils/jwt";

const userPayload = {
	_id: new mongoose.Types.ObjectId().toString(),
	username: "user8",
	password: expect.any(String),
	role: "user",
	createdAt: new Date(expect.any(String)),
	updatedAt: new Date(expect.any(String)),
	__v: 0,
};

const userInput = {
	username: "user8",
	password: "user8",
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRoutes);

describe("users", () => {
	it("should create users", async () => {
		const mockCreateUserService = jest
			.spyOn(UserService, "createUser")
			// @ts-ignore
			.mockReturnValueOnce(userPayload);
		const { statusCode } = await request(app)
			.post("/api/v1/auth/register")
			.send(userInput);

		expect(statusCode).toBe(201);
		expect(mockCreateUserService).toHaveBeenCalledWith(userInput);
	});

	describe("given user password and username is valid", () => {
		it("should login is user and return 200", async () => {
			const mockLoginUserService = jest
				.spyOn(UserService, "loginUser")
				// @ts-ignore
				.mockReturnValueOnce(userPayload);

			const { statusCode, body } = await request(app)
				.post("/api/v1/auth/login")
				.send(userInput);
			expect(statusCode).toBe(200);
			expect(body).toEqual({
				user: { username: "user8", id: expect.any(String) },
				token: expect.any(String),
			});
			expect(mockLoginUserService).toHaveBeenCalledWith(userInput);
		});
	});
});
