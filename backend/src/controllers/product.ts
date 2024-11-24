import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import { BadRequestError } from "../errors/bad-request-error";
import { ConflictError } from "../errors/conflict-error";
import { Error as MongooseError } from "mongoose";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    res.status(200).json({ items: products, total: products.length });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, image, category, description, price } = req.body;

    if (!title || !image || !category) {
      throw new BadRequestError(
        "Переданы некорректные данные при создании товара"
      );
    }
    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    res.status(201).json(product);
  } catch (error) {
    if (error instanceof Error && error.message.includes("E11000")) {
      return next(new ConflictError("Товар с таким названием уже существует"));
    }

    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError("Ошибка валидации данных"));
    }

    return next(error);
  }
};
