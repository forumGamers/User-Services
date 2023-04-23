import { config } from "dotenv";

config();

import express, { Application } from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import moment from "moment";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import Cron from "./cron";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    this.errorHandler();
  }

  protected plugins(): void {
    this.app.use(helmet({ referrerPolicy: { policy: "same-origin" } }));
    this.app.use(
      cors({
        origin(requestOrigin, callback) {
          const whiteList = process.env.CORSLIST as string;
          if (whiteList.indexOf(requestOrigin as string) !== -1) {
            callback(null, true);
          } else {
            callback(new Error(`Not allowed by CORS for URL ${requestOrigin}`));
          }
        },
      })
    );
    morgan.token("date", (req, res, tz: any) =>
      moment().utcOffset(tz).format()
    );
    morgan.format(
      "production",
      '[:date[Asia/Jakarta]] ":method :url" :status :res[content-length] - :response-time ms'
    );
    morgan.format(
      "dev",
      '[:date[Asia/Jakarta]] ":method :url" :status :res[content-length] - :response-time ms'
    );
    this.app.use(morgan("combined"));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  protected routes(): void {
    this.app.use(router);
  }

  protected errorHandler(): void {
    this.app.use(errorHandler);
  }

  protected cronJob(): void {
    Cron.deleteToken();
  }
}

export default new App().app;
