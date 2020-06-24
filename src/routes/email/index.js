import { Router } from "express";
import Joi from "joi";
import { createValidator } from "express-joi-validation";

import { create } from "./controller";

const router = new Router();
const validator = createValidator({ passError: true });

// validator schema
const emailToSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  name: Joi.string(),
});

const emailCcSchema = Joi.object().keys({
  email: Joi.string().email(),
  name: Joi.string(),
});

const postEmailSchema = Joi.object({
  subject: Joi.string().required(),
  content: Joi.string().required(),
  emailTo: Joi.array().items(emailToSchema),
  emailCc: Joi.array().items(emailCcSchema),
  emailBcc: Joi.array().items(emailCcSchema),
});

/**
 * @api {post} /v1/email Create email
 * @apiName create
 * @apiSuccess String send email successly.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError {Object} 500 Internal server error.
 */
router.post("/", validator.body(postEmailSchema), create);

export default router;
