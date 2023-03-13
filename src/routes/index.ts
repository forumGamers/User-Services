import BaseRoutes from "./base";
import AuthRoutes from "./auth";

class Router extends BaseRoutes {
  public routes(): void {
    this.router.use("/auth", AuthRoutes);
  }
}

export default new Router().router;
