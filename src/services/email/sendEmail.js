import { set, get } from "lodash";
import qs from "querystring";

import api from "../../utils";
import {
  emailFrom,
  sendGridApiUrl,
  sendGridApiKey,
  mailgunApiKey,
  mailgunApiUrl,
} from "../../config";
import {
  INITIAL_SENDGRID_BODY,
  INITIAL_SENDGRID_HEADER,
  INITIAL_SENDGRID_EMAIL_OBJECT,
  INITIAL_MAILGUND_BODY,
  INITIAL_MAILGUND_HEADER,
} from "./constants";

const createSendGrid = async (body) => {
  let header = INITIAL_SENDGRID_HEADER(sendGridApiKey);
  let payload = INITIAL_SENDGRID_BODY();

  let subject = body.subject;
  let content = body.content;
  let emailTo = body.emailTo;
  let emailCc = body.emailCc;
  let emailBcc = body.emailBcc;

  // convert request body to sendGrid api payload
  set(payload, "from", INITIAL_SENDGRID_EMAIL_OBJECT(emailFrom));
  set(payload, "personalizations[0].subject", subject);
  set(payload, "personalizations[0].to", emailTo);
  set(payload, "content[0].value", content);
  if (emailCc) {
    set(payload, "personalizations[0].cc", emailCc);
  }
  if (emailBcc) {
    set(payload, "personalizations[0].bcc", emailBcc);
  }

  await api.post(sendGridApiUrl, payload, header);
  return;
};

const createMailGund = async (body) => {
  let header = INITIAL_MAILGUND_HEADER(mailgunApiKey);
  let payload = INITIAL_MAILGUND_BODY();

  let subject = body.subject;
  let content = body.content;
  let emailTo = get(body, "emailTo", [])
    .map((o) => o.email)
    .join(",");
  let emailCc = get(body, "emailCc", [])
    .map((o) => o.email)
    .join(",");
  let emailBcc = get(body, "emailBcc", [])
    .map((o) => o.email)
    .join(",");

  // convert request body to mailgun api payload
  set(payload, "from", emailFrom);
  set(payload, "subject", subject);
  set(payload, "to", emailTo);
  set(payload, "text", content);
  if (emailCc) {
    set(payload, "cc", emailCc);
  }
  if (emailBcc) {
    set(payload, "bcc", emailBcc);
  }

  await api.post(mailgunApiUrl, qs.stringify(payload), header);
  return;
};

export { createSendGrid, createMailGund };
