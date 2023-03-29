import BaseRoutes from "./base";
import AuthRoutes from "./auth";
import UserRoutes from "./user";
import FollowingRoutes from "./following";
import TopupRoutes from "./topup";
import AchievementRoutes from "./achievement";

class Router extends BaseRoutes {
  public routes(): void {
    this.router
      .use("/users", UserRoutes)
      .use("/auth", AuthRoutes)
      .use("/following", FollowingRoutes)
      .use("/topup", TopupRoutes)
      .use("/achievement", AchievementRoutes);
  }
}

export default new Router().router;
