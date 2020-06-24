import request from "supertest";

import { apiRoot } from "../../config";
import express from "../../services/express";
import routes from ".";

const app = () => express(apiRoot, routes);

// e2e testing
test("POST /email get 201 success status", async () => {
  const payload = {
    subject: "Email subject",
    content: "Email contents",
    emailTo: [
      {
        email: "jeffrey9231@gmail.com",
        name: "Jeffrey Test",
      },
    ],
  };
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send(payload);
  expect(status).toBe(201);
  expect(typeof body).toEqual("string");
});

test("POST /email get 400 validation error", async () => {
  const payload = {
    emailTo: [
      {
        email: "jeffrey9231@gmail.com",
        name: "Jeffrey Test",
      },
    ],
  };
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send(payload);
  expect(status).toBe(400);
  expect(typeof body).toEqual("object");
});
