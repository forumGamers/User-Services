import BaseRoutes from "./base";
import AuthRoutes from "./auth";
import UserRoutes from "./user";
import FollowingStoreRoutes from "./followingStore";
import TokenRoutes from "./token";
import { queryFilter } from "../middlewares/queryFilter";

class Router extends BaseRoutes {
  public routes(): void {
    this.router
      .use(queryFilter)
      .use("/users", UserRoutes)
      .use("/auth", AuthRoutes)
      .use("/following-store", FollowingStoreRoutes)
      .use("/token", TokenRoutes);
  }
}

export default new Router().router;
