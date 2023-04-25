import Controller from "../controllers/user";
import { authentication } from "../middlewares/authentication";
import { authorize } from "../middlewares/authorize";
import { upload } from "../middlewares/multer";
import BaseRoutes from "./base";

class UserRouter extends BaseRoutes {
  routes(): void {
    this.router
      .get("/", Controller.getUser)
      .get("/myData", authentication, Controller.getMyData)
      .post("/createStore", authentication, authorize, Controller.createStore)
      .patch(
        "/phoneNumber",
        authorize,
        authentication,
        Controller.changePhoneNumber
      )
      .patch("/changeEmail", authentication, authorize, Controller.changeEmail)
      .patch("/username", authentication, authorize, Controller.changeUsername)
      .patch("/password", authentication, authorize, Controller.changePassword)
      .patch(
        "/changeimage",
        authentication,
        upload.single("image"),
        Controller.changeImg
      )
      .patch("/verify", Controller.verify)
      .get("/:id", Controller.getUserById)
      .delete("/:id", authentication, authorize, Controller.deleteUser);
  }
}

export default new UserRouter().router;
