import Controller from "../controllers/auth";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";
import BaseRoutes from "./base";

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .post("/register", Controller.register)
      .post("/register/admin", authorizeAdmin, Controller.registerNewAdmin)
      .post("/login", Controller.login)
      .patch("/logout", Controller.logout);
  }
}

export default new AuthRoutes().router;
