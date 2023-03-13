import multer from "multer";
import { Request } from "express";
import file from "../interfaces/multer";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req: Request, file: file, cb: Function) => {
      cb(null, "./uploads");
    },
    filename: (req: Request, file: file, cb: Function) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  }),
});
