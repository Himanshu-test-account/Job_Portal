import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
     title: {
        type: String,
        required: true
     },
     jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time"]
     },
     location: {
        type: String,
        required: true,
     },
     companyName: {
        type: String,
        required: true
     },
     introduction: {
        type: String,
     },
     responsibilities: {  // Change to array of strings
        type: [String],
        required: true
     },
     qualifications: {    // Change to array of strings
        type: [String],
        required: true
     },
     offers: {
        type: String
     },
     salary: {
        type: String,
        required: true
     },
     hiringMultipleCandidates: {
        type: String,
        default: "No",
        enum: ["Yes", "No"]
     },
     personalWebsite: {
        title: String,
        url: String
     },
     jobNiche: {
        type: String,
        required: true
     },
     newsLetterSent: {
        type: Boolean, // Change to Boolean since it indicates true/false
        default: false
     },
     jobPost: {
        type: Date,
        default: Date.now,
    },
     postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
     }
});

export const Job = mongoose.model("Job", jobSchema);
