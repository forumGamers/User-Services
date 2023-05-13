import BaseRoutes from "./base";
import AuthRoutes from "./auth";
import UserRoutes from "./user";
import FollowingRoutes from "./following";
import TopupRoutes from "./topup";
import TokenRoutes from "./token";
import { bodyDecryption } from "../middlewares/bodyDecription";
import { queryFilter } from "../middlewares/queryFilter";

class Router extends BaseRoutes {
  public routes(): void {
    this.router
      .use(queryFilter)
      .use(bodyDecryption)
      .use("/users", UserRoutes)
      .use("/auth", AuthRoutes)
      .use("/following", FollowingRoutes)
      .use("/topup", TopupRoutes)
      .use("/token", TokenRoutes);
  }
}

export default new Router().router;
