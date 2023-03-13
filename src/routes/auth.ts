import Controller from "../controllers/auth";
import BaseRoutes from "./base";

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .post("/register", Controller.register)
      .post("/login", Controller.login);
  }
}

export default new AuthRoutes().router;
