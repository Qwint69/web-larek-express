import Joi from "joi";

export const productValidationSchema = {
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required().messages({
      "string.base": '"title" должно быть строкой',
      "string.empty": '"title" не может быть пустым',
      "string.min": '"title" должно быть длиной от 2 до 30 символов',
      "string.max": '"title" должно быть длиной от 2 до 30 символов',
      "any.required": '"title" обязательно',
    }),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().optional().allow(null),
  }),
};

export const orderValidationSchema = {
  body: Joi.object().keys({
    payment: Joi.string().valid("card", "online").required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.string().required()).min(1).required(),
  }),
};
