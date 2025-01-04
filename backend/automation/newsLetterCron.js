import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron Automation");
    const jobs = await Job.find({ newsLetterSent: false });
    for (const job of jobs) {
      try {
        const filterUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });
        for (const user of filterUsers) {
          const subject = `New Job Opportunity in ${job.jobNiche} - ${job.title}`;
          const message = `<h3>Hi ${user.name},</h3>
                        <p>We have a new job opening that might interest you!</p>
                        <p><strong>Job Title:</strong> ${job.title}</p>
                        <p><strong>Company:</strong> ${job.companyName}</p>
                        <p><strong>Location:</strong> ${job.location}</p>
                        <p><strong>Description:</strong> ${job.jobDescription}</p>
                        <p>To apply or learn more, visit our job portal.</p>
                        <p>Best regards, <br/> The Job Portal Team</p>`;
          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }
        job.newsLetterSent = true;
        await job.save();
      } catch (error) {
        console.log("ERROR IN NODE CRON CATCH BLOCK");
        return next(console.error(error || "Some error is Cron."));
      }
    }
  });
};
