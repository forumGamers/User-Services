import Controller from "../controllers/auth";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";
import BaseRoutes from "./base";

class AuthRoutes extends BaseRoutes {
  routes(): void {
    this.router
      .post("/register", Controller.register)
      .post("/register/admin", authorizeAdmin, Controller.registerNewAdmin)
      .post("/login", Controller.login)
      .post("/reset-password", Controller.getResetPasswordToken)
      .patch('/change-forget-pass')
      .patch("/logout", Controller.logout);
  }
}

export default new AuthRoutes().router;
