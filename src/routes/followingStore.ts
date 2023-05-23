import Controller from "../controllers/followingStore";
import BaseRoutes from "./base";
import { authentication } from "../middlewares/authentication";
class FollowingRouter extends BaseRoutes {
  routes(): void {
    this.router
      .get("/count/:storeId", Controller.CountStoreFollower)
      .post("/:storeId", authentication, Controller.FollowStore);
  }
}

export default new FollowingRouter().router;
