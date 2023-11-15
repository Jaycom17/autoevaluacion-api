"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labor_controllers_1 = require("../controllers/labor.controllers");
const laborRouter = (0, express_1.Router)();
laborRouter.get("/labor", labor_controllers_1.getLabors);
exports.default = laborRouter;
