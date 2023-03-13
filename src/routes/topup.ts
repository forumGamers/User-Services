import TopUpController from "../controllers/topup";
import BaseRoutes from "./base";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorize";

class TopUpRouter extends BaseRoutes {
  routes(): void {
    this.router
      .get("/", authentication, TopUpController.getAllData) //auth admin
      .get("/mybalance", authentication, TopUpController.getMyData)
      .post("/", authentication, authorize, TopUpController.purchase);
  }
}

export default new TopUpRouter().router;
