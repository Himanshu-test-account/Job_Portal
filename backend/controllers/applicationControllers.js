import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, address, coverLetter } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !address || !coverLetter) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Check if job exists
  const jobDetails = await Job.findById(id);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found", 404));
  }

  // Check for duplicate application
  const isAlreadyApplied = await Application.findOne({
    "jobInfo.jobId": id,
    "jobSeekerInfo.id": req.user._id,
  });
  
  if (isAlreadyApplied) {
    return next(
      new ErrorHandler("You have already applied for this job.", 400)
    );
  }

  // Prepare jobSeekerInfo
  const jobSeekerInfo = {
    id: req.user._id,
    name,
    email,
    phone,
    address,
    coverLetter,
    role: "Job Seeker",
  };

  // Handle resume upload
  if (req.files && req.files.resume) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        req.files.resume.tempFilePath,
        {
          folder: "Job_Resume",
        }
      );
      
      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(
          new ErrorHandler("Failed to upload resume to cloudinary.", 500)
        );
      }
      
      jobSeekerInfo.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      console.error("Resume upload error:", error);
      return next(new ErrorHandler("Failed to upload resume", 500));
    }
  } else if (req.user && req.user.resume && req.user.resume.url) {
    jobSeekerInfo.resume = {
      public_id: req.user.resume.public_id,
      url: req.user.resume.url, // Fixed: was using public_id instead of url
    };
  } else {
    return next(new ErrorHandler("Please upload your resume.", 400));
  }

  // Prepare employer and job info
  const employerInfo = {
    id: jobDetails.postedBy,
    role: "Employer",
  };

  const jobInfo = {
    jobId: id,
    jobTitle: jobDetails.title,
  };

  // Create application
  try {
    const application = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });

    res.status(200).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("Application creation error:", error);
    return next(new ErrorHandler("Failed to create application", 500));
  }
});

export const employerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "employerInfo.id": _id,
      "deletedBy.employer": false,
    });
    
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobSeekerGetAllApplication = catchAsyncErrors(
  async (req, res, next) => {
    try {
      // Extract job seeker ID from query parameter or JWT token
      const { _id } = req.user; // Assuming `req.user` is populated with the authenticated user info

      // Fetch all applications for the job seeker
      const applications = await Application.find({
        "jobSeekerInfo.id": _id, // Ensure the job seeker ID matches
        "deletedBy.jobSeeker": false, // Ensure the application wasn't deleted by the job seeker
      });

      // If no applications are found
      if (applications.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No applications found for this job seeker.",
        });
      }

      // Respond with the applications
      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      next(error); // Pass errors to the error handler
    }
  }
);




export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findById(id);
  
  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  const { role } = req.user;
  
  switch (role.toLowerCase()) { // Added toLowerCase() for case-insensitive comparison
    case "job seeker":
      application.deletedBy.jobSeeker = true;
      break;
    case "employer":
      application.deletedBy.employer = true;
      break;
    default:
      return next(new ErrorHandler("Invalid user role", 400));
  }

  await application.save();

  // Check if both parties have deleted the application
  if (application.deletedBy.employer && application.deletedBy.jobSeeker) {
    await application.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: "Application deleted successfully."
  });
});