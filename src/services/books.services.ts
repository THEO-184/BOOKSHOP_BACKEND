import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import { NotFound } from "../errors";
import Book from "../models/book.model";
import { BookDocument } from "../utils/book.types";

export const createBook = async (
	input: DocumentDefinition<Omit<BookDocument, "createdAt" | "updatedAt">>
) => {
	const book = await Book.create(input);

	return book;
};

export const getBooks = async (queryObj: FilterQuery<BookDocument>) => {
	const books = await Book.find(queryObj).sort("title");

	return books;
};

export const editBooks = async (
	filter: FilterQuery<BookDocument>,
	update: UpdateQuery<BookDocument>
) => {
	const book = await Book.findOneAndUpdate(filter, update, {
		new: true,
		runValidators: true,
	});

	return book;
};
