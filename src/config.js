/* eslint-disable no-unused-vars */
import path from "path";
import merge from "lodash/merge";

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    path: path.join(__dirname, "../.env"),
    example: path.join(__dirname, "../.env.example"),
  });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, ".."),
    port: process.env.PORT || 3000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "/v1",
    masterKey: requireProcessEnv("MASTER_KEY"),
    emailFrom: process.env.EMAIL_FROM || "jeffrey9231@gmail.com",
    sendGridApiUrl:
      process.env.SENDGRID_API_URL || "https://api.sendgrid.com/v3/mail/send",
    sendGridApiKey:
      process.env.SENDGRID_API_KEY || '',
    mailgunApiUrl:
      process.env.MAILGUN_API_URL ||
      "https://api.mailgun.net/v3/jeffrey9231.mydomain.com/messages",
    mailgunApiKey:
      process.env.MAILGUN_API_KEY || '',
  },
  test: {},
  development: {},
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
  },
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
