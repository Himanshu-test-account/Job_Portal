import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js"
import { postJob, getAllJobs, getASingleJob, getMyJob, deleteJob } from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyJobs", isAuthenticated, isAuthorized("Employer"), getMyJob);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Employer"), deleteJob);
router.get("/get/:id", getASingleJob)

export default router;