import FollowingController from "../controllers/following";
import BaseRoutes from "./base";
import { authentication } from "../middlewares/authentication";
class FollowingRouter extends BaseRoutes {
  routes(): void {
    this.router
      .get("/", FollowingController.getAllData)
      .get("/myFollow", authentication, FollowingController.getMyData)
      .get("/:id", FollowingController.getStoreFollowData)
      .post("/:id", authentication, FollowingController.follow)
      .delete("/:id", authentication, FollowingController.delete);
  }
}

export default new FollowingRouter().router;
