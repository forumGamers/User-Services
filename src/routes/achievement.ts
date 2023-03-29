import Controller from "../controllers/achievement";
import { authentication } from "../middlewares/authentication";
import BaseRoutes from "./base";

class AchievementRouter extends BaseRoutes {
  routes(): void {
    this.router.post("/",authentication, Controller.addAchievment);
  }
}

export default new AchievementRouter().router;
