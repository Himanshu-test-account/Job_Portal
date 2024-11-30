import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  jobSeekerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    coverLetter: {
      type: String,
      required: true
    },
    resume: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true
    }
  },
  employerInfo: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true
    }
  },
  jobInfo: {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    }
  },
  deletedBy: {
    employer: {
      type: Boolean,
      default: false
    },
    jobSeeker: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

export const Application = mongoose.model("Application", applicationSchema);