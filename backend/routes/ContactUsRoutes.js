import express from "express";
import { submitContactForm, getContactMessages } from "../controllers/ContactUsControllers.js";

const router = express.Router();

// Route for submitting the contact form
router.post("/contact-us", submitContactForm);

// Admin route to view all contact messages (authentication required)
router.get("/admin/contact-messages", getContactMessages);

export default router;
