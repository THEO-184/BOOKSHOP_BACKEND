import { authMiddleware } from "./../middlewares/authMiddleware";
import { Roles, UserInput } from "./../utils/user.types";
import mongoose from "mongoose";
import express from "express";
import * as BooksService from "../services/books.services";
import request from "supertest";
import path from "path";
import bookRoutes from "../routes/book.routes";
import bodyParser from "body-parser";
import adminMiddleware from "../middlewares/adminMiddleware";
import ts from "typescript";

// {
// 	title: "Book 13",
// 	description: "13th book added to library",
// 	price: 10,
// 	picture:
// 		"../../../../../Downloads/Banner 3.png",
// 	quantity: 10,
// 	user: new mongoose.Types.ObjectId().toString(),

// },

const userInput = {
	title: "Book 13",
	description: "13th book added to library",
	price: 10,
	picture: "../the-last-to-vanish-9781982147310_hr.jpg",
	quantity: 10,
	user: "12345",
};

const bookResponse = {
	book: {
		title: "Book 12",
		description: "12th book added to library",
		price: 10,
		picture: expect.any(Object),
		quantity: 10,
		user: expect.any(Object),
		_id: expect.any(Object),
		__v: 0,
	},
};

const editedBook = {
	book: {
		_id: "6326f792309998b9cf8d371f",
		title: "Editing book 12",
		description: "12th book added to library",
		price: 0,
		picture:
			"https://res.cloudinary.com/dolgpezth/image/upload/v1663498129/MERN-SOCIAL/posts-photos/tmp-2-1663498122270_ylxbxv.jpg",
		quantity: 10,
		user: "632650de2589586965b8551f",
		__v: 0,
	},
};

const editBook = {
	title: "Editing book 13",
	description: "Edited this book with jest",
};

const editId = {
	_id: "/6326f792309998b9cf8d371f",
	user: "632651242589586965b85522",
};

const allBooksResponse = {
	count: 1,
	books: [{ ...bookResponse.book }],
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/books", bookRoutes);

describe("books", () => {
	it.skip("should create books", async () => {
		const mockCreateBooksServices = jest
			.spyOn(BooksService, "createBook")
			// @ts-ignore
			.mockReturnValueOnce(bookResponse);

		const { body, statusCode } = await request(app)
			.post("/api/v1/books")
			.send(userInput);

		expect(statusCode).toBe(201);
		console.log("create book", body);
		expect(mockCreateBooksServices).toHaveBeenCalledWith(userInput);
	});

	it("should get all books", async () => {
		const mockGetBooksService = jest
			.spyOn(BooksService, "getBooks")
			// @ts-ignore
			.mockReturnValueOnce(allBooksResponse);
		const { body, statusCode } = await request(app).get("/api/v1/books");
		expect(statusCode).toBe(200);
		expect(body.books).toEqual({
			count: 1,
			books: [{ ...bookResponse.book }],
		});
		console.log("get books", body.books);
	});

	it("should edit books", async () => {
		const mockEditBookService = jest
			.spyOn(BooksService, "editBooks")
			// @ts-ignore
			.mockReturnValueOnce(editedBook);
		const { statusCode, body } = await request(app)
			.put("api/v1/books/6326f792309998b9cf8d371f")
			.send(editBook);
		expect(statusCode).toBe(200);
		console.log("edited books", body);
		expect(mockEditBookService).toHaveBeenCalledWith(editId, editBook);
	});
});
