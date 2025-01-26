import { body } from "express-validator";
import { Roles } from "../types/register.interface";

export const loginValidator = [
	body("email", "invalid email format").isEmail(),
	body("password", "password must have min 5 symbols").isLength({ min: 5 }),
];

export const registerValidator = [
	body("email", "Invalid email format").isEmail(),
	body("password", "Password must have at least 5 symbols").isLength({
		min: 5,
	}),
	body("userName", "Enter your name").isLength({ min: 3 }),
	body("userSurname", "Enter your surname").isLength({ min: 3 }),
	body("role", "Invalid role").isIn(
		Object.values(Roles).filter(v => typeof v === "string")
	),
	body("nameCompany", "Enter company name (if applicable)")
		.optional()
		.isLength({ min: 3 }),
	body("addressCompany", "Enter company address (if applicable)")
		.optional()
		.isLength({ min: 5 }),
];

export const postCreateValidation = [
	body("title", "Enter a valid title").isLength({ min: 3 }).isString(),
	body("description", "Enter a valid text")
		.isLength({ min: 10 })
		.isString()
		.escape(),
	body("tags", "Tags must be an array").isArray(),
	body("recruiterId", "Recruiter ID must be an integer").isInt(),
];
