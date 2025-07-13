import { Router } from "express";
import {
  addActivity,
  deleteActivity,
  getActivities,
  getActivitySummary,
  getAllActivities,
} from "../controllers/activity.controllers.js";
import { userAuth } from "../middlewares/auth.middlewares.js";
import { requireAdmin } from "../middlewares/admin.middlewares.js";
const activityRouter = Router();

activityRouter.post("/create", userAuth, addActivity);
activityRouter.get("/delete/:id", userAuth, deleteActivity);
activityRouter.get("/getActivities", userAuth, getActivities);
activityRouter.get("/getActivitySummary", userAuth, getActivitySummary);
activityRouter.get(
  "/getAllActivities",
  userAuth,
  requireAdmin,
  getAllActivities
);

export default activityRouter;
