import { Router } from "express";
import { saveDocument, getDocument } from "../controllers/saveDocument.controllers";
import { auth } from "../middlewares/auth.middleware";
import multer from "multer";

const saveDocumentRouter = Router();

const upload = multer({ dest: "uploads/" });

saveDocumentRouter.post("/saveDocument", auth, upload.single("file"), saveDocument);

saveDocumentRouter.get("/saveDocument/:filename", auth, getDocument);

export default saveDocumentRouter;