import mongoose from "mongoose";
import express from "express";
import * as CartService from "../services/cart.serivices";
import request from "supertest";
import cartRoutes from "../routes/cart.routes";
import bodyParser from "body-parser";
import { createJwt } from "../utils/jwt";
import { authMiddleware } from "../middlewares/authMiddleware";
import { Roles } from "../utils/user.types";

const cartResponse = {
	_id: new mongoose.Types.ObjectId().toString(),
	bookID: new mongoose.Types.ObjectId().toString(),
	createdBy: new mongoose.Types.ObjectId().toString(),
	valid: true,
	createdAt: new Date("2021-09-30T13:31:07.674Z"),
	updatedAt: new Date("2021-09-30T13:31:07.674Z"),
	__v: 0,
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/cart", authMiddleware, cartRoutes);

describe("cart", () => {
	it("should create cart", async () => {
		const mockCreateCartService = jest.spyOn(CartService, "createCart");
		const token = createJwt({
			username: "user5",
			id: "user5",
			role: Roles.user,
		});

		const { statusCode } = await request(app)
			.post("/api/v1/cart")
			.set("Authorization", `Bearer ${token}`)
			.send({
				bookID: "6323167a6432f1a6e882ebe8",
			});
		expect(statusCode).toBe(200);
		expect(mockCreateCartService).toHaveBeenCalledWith({
			createdBy: "user5",
			bookID: "6323167a6432f1a6e882ebe8",
			quantity: 1,
		});
	});
});
