import axios from "axios";

const post = (url, payload, header) =>
  axios
    .post(url, payload, header)
    .then((res) => res.data)
    .catch((err) => {
      // throw error to controller
      throw new Error(JSON.stringify(err.response.data));
    });

export { post };
