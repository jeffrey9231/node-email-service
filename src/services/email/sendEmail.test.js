import qs from "querystring";

import { createSendGrid, createMailGund } from "./sendEmail";
import api from "../../utils";
import {
  sendGridApiUrl,
  sendGridApiKey,
  mailgunApiKey,
  mailgunApiUrl,
} from "../../config";
import { INITIAL_SENDGRID_HEADER, INITIAL_MAILGUND_HEADER } from "./constants";

jest.mock("../../utils");

//Unit testing
describe("sendEmail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Unit test of createSendGrid", async () => {
    const body = {
      subject: "Email subject",
      content: "Email contents",
      emailTo: [
        {
          email: "jeffrey9231@gmail.com",
          name: "Jeffrey Test",
        },
      ],
      emailCc: [
        {
          email: "jeffrey9231+1@gmail.com",
          name: "Jeffrey Test1",
        },
      ],
      emailBcc: [
        {
          email: "jeffrey9231+2@gmail.com",
          name: "Jeffrey Test2",
        },
        {
          email: "jeffrey9231+3@gmail.com",
          name: "Jeffrey Test3",
        },
      ],
    };

    const payload = {
      content: [
        {
          type: "text/plain",
          value: "Email contents",
        },
      ],
      from: {
        email: "jeffrey9231@gmail.com",
      },
      personalizations: [
        {
          bcc: [
            {
              email: "jeffrey9231+2@gmail.com",
              name: "Jeffrey Test2",
            },
            {
              email: "jeffrey9231+3@gmail.com",
              name: "Jeffrey Test3",
            },
          ],
          cc: [
            {
              email: "jeffrey9231+1@gmail.com",
              name: "Jeffrey Test1",
            },
          ],
          subject: "Email subject",
          to: [
            {
              email: "jeffrey9231@gmail.com",
              name: "Jeffrey Test",
            },
          ],
        },
      ],
    };

    await createSendGrid(body);
    expect(api.post).toBeCalledWith(
      sendGridApiUrl,
      payload,
      INITIAL_SENDGRID_HEADER(sendGridApiKey)
    );
  });

  it("Unit test of createMailGund", async () => {
    const body = {
      subject: "Email subject",
      content: "Email contents",
      emailTo: [
        {
          email: "jeffrey9231@gmail.com",
          name: "Jeffrey Test",
        },
      ],
      emailCc: [
        {
          email: "jeffrey9231+1@gmail.com",
          name: "Jeffrey Test1",
        },
      ],
      emailBcc: [
        {
          email: "jeffrey9231+2@gmail.com",
          name: "Jeffrey Test2",
        },
        {
          email: "jeffrey9231+3@gmail.com",
          name: "Jeffrey Test3",
        },
      ],
    };

    const payload = qs.stringify({
      from: "jeffrey9231@gmail.com",
      to: "jeffrey9231@gmail.com",
      subject: "Email subject",
      text: "Email contents",
      cc: "jeffrey9231+1@gmail.com",
      bcc: "jeffrey9231+2@gmail.com,jeffrey9231+3@gmail.com",
    });

    await createMailGund(body);
    expect(api.post).toBeCalledWith(
      mailgunApiUrl,
      payload,
      INITIAL_MAILGUND_HEADER(mailgunApiKey)
    );
  });
});
