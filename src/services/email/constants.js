export const INITIAL_SENDGRID_BODY = () => ({
  personalizations: [
    {
      to: [],
      subject: undefined,
    },
  ],
  from: undefined,
  content: [
    {
      type: "text/plain",
      value: undefined,
    },
  ],
});

export const INITIAL_SENDGRID_EMAIL_OBJECT = (email) => ({
  email,
});

export const INITIAL_SENDGRID_HEADER = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export const INITIAL_MAILGUND_HEADER = (token) => ({
  auth: {
    username: "api",
    password: token,
  },
});

export const INITIAL_MAILGUND_BODY = () => ({
  from: undefined,
  to: undefined,
  subject: undefined,
  text: undefined,
});
