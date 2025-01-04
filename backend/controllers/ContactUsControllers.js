import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ContactMessage } from "../models/ContactMessageSchema.js";
import ErrorHandler from "../middlewares/error.js";

// Controller to handle contact form submission
export const submitContactForm = catchAsyncErrors(async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    // Create a new contact message object
    const contactMessage = await ContactMessage.create({
        name,
        email,
        subject,
        message,
    });

    // Optionally, send an email confirmation (not implemented here, you could use nodemailer or another service)
    // sendConfirmationEmail(email, subject); // Example: sending an email

    res.status(201).json({
        success: true,
        message: "Your message has been submitted successfully. We will get back to you soon.",
        contactMessage,
    });
});

// Controller to get all contact messages (admin access)
export const getContactMessages = catchAsyncErrors(async (req, res, next) => {
    const messages = await ContactMessage.find().sort({ submittedAt: -1 });

    res.status(200).json({
        success: true,
        messages,
    });
});
