import { Router } from "express";

import email from "./email";

const router = new Router();

/**
 * @apiDefine public access
 *  /v1/email
 * no auth access for this endpoint.
 */
router.use("/email", email);

export default router;
