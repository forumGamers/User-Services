import Controller from "../controllers/token";
import { authentication } from "../middlewares/authentication";
import { authorizeAdmin } from "../middlewares/authorizeAdmin";
import BaseRoutes from "./base";

class TokenRouter extends BaseRoutes {
  public routes(): void {
    this.router.get(
      "/get-list",
      authentication,
      authorizeAdmin,
      Controller.getListLoggedIn
    );
  }
}

export default new TokenRouter().router;
