import BaseRoutes from "./base";
import AuthRoutes from "./auth";
import UserRoutes from "./user";
import FollowingRoutes from "./following";
import TopupRoutes from "./topup";

class Router extends BaseRoutes {
  public routes(): void {
    this.router.use("/users", UserRoutes);
    this.router.use("/auth", AuthRoutes);
    this.router.use("/following", FollowingRoutes);
    this.router.use("/topup", TopupRoutes);
  }
}

export default new Router().router;
