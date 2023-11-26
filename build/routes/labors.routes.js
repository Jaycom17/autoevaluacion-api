"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labor_controllers_1 = require("../controllers/labor.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const laborRouter = (0, express_1.Router)();
laborRouter.post("/labor", auth_middleware_1.authCordinator, labor_controllers_1.createLabor); //Create
laborRouter.get("/labor/name/:name", auth_middleware_1.authCordinator, labor_controllers_1.showLaborByName); //GetByName
laborRouter.get("/labor/:id", auth_middleware_1.authCordinator, labor_controllers_1.showLaborById); //GetByID
laborRouter.get("/labor", auth_middleware_1.authCordinator, labor_controllers_1.showLaborList); //GetAll
laborRouter.put("/labor/:id", auth_middleware_1.authCordinator, labor_controllers_1.updateLabor); //Update
laborRouter.delete("/labor/:id", auth_middleware_1.authCordinator, labor_controllers_1.deleteLabor); //Delete
exports.default = laborRouter;
