import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { 
  deleteApplication, 
  employerGetAllApplication, 
  jobSeekerGetAllApplication,
  postApplication 
} from "../controllers/applicationControllers.js";

const router = express.Router();

// Post new application
router.post(
  "/post/:id", 
  isAuthenticated, 
  isAuthorized("Job Seeker"), 
  postApplication
);

// Get all applications for employer
router.get(
  "/employer/getall", 
  isAuthenticated, 
  isAuthorized("Employer"), 
  employerGetAllApplication
);

// Get all applications for job seeker
router.get(
  "/jobseeker/getall", 
  isAuthenticated, 
  isAuthorized("Job Seeker"), 
  jobSeekerGetAllApplication  // Fixed: was using employerGetAllApplication
);

// Delete application
router.delete(
  "/delete/:id", 
  isAuthenticated, 
  deleteApplication
);

export default router;