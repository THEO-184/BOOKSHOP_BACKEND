import { DocumentDefinition } from "mongoose";
import Cart from "../models/cart.model";
import { CartDocument } from "../utils/cart.types";

export const createCart = async (
	input: DocumentDefinition<Pick<CartDocument, "createdBy" | "bookID">>
) => {
	const cart = await (
		await Cart.create(input)
	).populate("bookID", "title description");

	return cart;
};

export const getAllBooks = async () => {};
