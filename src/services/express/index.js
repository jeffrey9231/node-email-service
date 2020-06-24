import express from "express";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import path from "path";

import { env } from "../../config";

const spec = path.join(__dirname, "../../openapi.yaml");
const swaggerDocument = YAML.load(spec);

export default (apiRoot, routes) => {
  const app = express();

  /* istanbul ignore next */
  if (env === "production" || env === "development") {
    app.use(cors());
    app.use(compression());
    app.use(morgan("dev"));
  }

  // Integrate api docs with swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);

  // global error handler
  app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      // we had a joi error return 400
      res.status(400).json({
        message: err.error.toString(),
      });
    } else {
      res.status(err.status || 500).json({
        message: err.message,
      });
    }
  });

  return app;
};
