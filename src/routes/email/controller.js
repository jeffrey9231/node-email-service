import { get } from "lodash";

import { createSendGrid, createMailGund } from "../../services/email";

export const create = async ({ body }, res) => {
  try {
    await createMailGund(body);
    res.status(201).json("Send email by MailGund");
    // catch error from MailGund api
  } catch (err) {
    // error retry
    try {
      await createSendGrid(body);
      res.status(201).json("Send email by SendGrid");
      // catch error from SendGrid api
    } catch (err) {
      // responds error
      const errMessage = JSON.parse(err.message);
      const sendGridError = get(errMessage, "errors[0].message");

      res.status(400).json({
        message: sendGridError || errMessage,
      });
    }
  }
};

// {"message":"The domain is unverified and requires DNS configuration. Log in to your control panel to view required DNS records."}
