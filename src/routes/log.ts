import Controller from "../controllers/log";
import { authentication } from "../middlewares/authentication";
import BaseRoutes from "./base";

class LogRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .post("/", authentication, Controller.createLog)
      .post("/many", authentication, Controller.createManyLogs);
  }
}

export default new LogRoutes().router;
