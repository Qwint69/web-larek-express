import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { faker } from "@faker-js/faker";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payment, email, phone, address, total, items } = req.body;

    if (
      !payment ||
      !email ||
      !phone ||
      !address ||
      !total ||
      !items ||
      !items.length
    ) {
      throw new BadRequestError(
        "Переданы некорректные данные при создании заказа"
      );
    }

    if (!["card", "online"].includes(payment)) {
      throw new BadRequestError("Некорректный способ оплаты");
    }
    const products = await Product.find({
      _id: { $in: items },
      price: { $ne: null },
    });

    if (products.length !== items.length) {
      throw new NotFoundError("Некоторые товары отсутствуют или не продаются");
    }

    const calculatedTotal = products.reduce(
      (sum, product) => sum + (product.price || 0),
      0
    );
    if (calculatedTotal !== total) {
      throw new BadRequestError(
        "Переданная сумма total не совпадает с суммой товаров"
      );
    }
    const orderId = faker.string.uuid();

    res.status(201).json({ id: orderId, total });
  } catch (error) {
    next(error);
  }
};
