import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const {
        title,
        jobType,
        location,
        companyName,
        introduction,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsiteTitle,
        personalWebsiteUrl,
        jobNiche,
    } = req.body;

    // Validate all required fields are provided
    if (
        !title ||
        !jobType ||
        !location ||
        !companyName ||
        !introduction ||
        !responsibilities ||
        !qualifications ||
        !salary ||
        !jobNiche
    ) {
        return next(new ErrorHandler("Please provide full job details.", 400));
    }

    // Validate that both personal website title and URL are either provided or omitted
    if (
        (personalWebsiteTitle && !personalWebsiteUrl) ||
        (!personalWebsiteTitle && personalWebsiteUrl)
    ) {
        return next(
            new ErrorHandler(
                "Provide both the website URL and title, or leave both blank.",
                400
            )
        );
    }

    // Get the user who is posting the job (ensure user is authenticated)
    const postedBy = req.user._id;

    // Create the job document
    const job = await Job.create({
        title,
        jobType,
        location,
        companyName,
        introduction,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsite: {
            personalWebsiteTitle,
            personalWebsiteUrl,
        },
        jobNiche,
        postedBy,
    });

    // Send success response with the created job data
    res.status(201).json({
        success: true,
        message: "Job posted successfully",
        job,
    });
});
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const { city, niche, searchKeyword } = req.query;
    const query = {};
    if (city) {
        query.location = city;
    }
    if (niche) {
        query.jobNiche = niche;
    }
    if (searchKeyword) {
        query.$or = [
            { title: { $regex: searchKeyword, $options: "i" } },
            { companyName: { $regex: searchKeyword, $options: "i" } },
            { introduction: { $regex: searchKeyword, $options: "i" } },
        ];
    }
    const jobs = await Job.find(query);
    res.status(200).json({
        success: true,
        jobs,
        count: jobs.length,
    });
});
export const getMyJob = catchAsyncErrors(async (req, res, next) => {
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myJobs,
    });
});
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Oops! Job not found.", 400));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted"
    })
})
export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Job not found.", 400));
    }
    res.status(200).json({
        success: true,
        job,
    })
})

