import Controller from "../controllers/auth";
import BaseRoutes from "./base";

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .post("/register", Controller.register)
      .post("/login", Controller.login)
      .patch("/logout", Controller.logout);
  }
}

export default new AuthRoutes().router;
