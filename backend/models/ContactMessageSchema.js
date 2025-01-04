import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), // Simple email validation regex
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
