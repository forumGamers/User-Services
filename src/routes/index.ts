import BaseRoutes from "./base";
import AuthRoutes from "./auth";
import UserRoutes from "./user";
import FollowingRoutes from "./following";
import TopupRoutes from "./topup";
import TokenRoutes from "./token";
import LogRoutes from "./log";

class Router extends BaseRoutes {
  public routes(): void {
    this.router
      .use("/users", UserRoutes)
      .use("/auth", AuthRoutes)
      .use("/following", FollowingRoutes)
      .use("/topup", TopupRoutes)
      .use("/token", TokenRoutes)
      .use("/log", LogRoutes);
  }
}

export default new Router().router;
