import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";

// Validation helpers
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;  // Assumes 10-digit phone number
    return phoneRegex.test(phone);
};

const validatePassword = (password) => {
    return password.length >= 6;  // Minimum 6 characters
};

// Resume upload helper
const handleResumeUpload = async (file, oldPublicId = null) => {
    try {
        // Delete old resume if exists
        if (oldPublicId) {
            await cloudinary.uploader.destroy(oldPublicId);
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "Job_Resume",
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            throw new Error("Failed to upload resume to cloud");
        }

        return {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        };
    } catch (error) {
        throw new Error(`Resume upload failed: ${error.message}`);
    }
};

export const register = catchAsyncErrors(async (req, res, next) => {
    const { 
        name, 
        email, 
        phone, 
        address, 
        password, 
        role, 
        firstNiche, 
        secondNiche, 
        thirdNiche, 
        coverLetter 
    } = req.body;

    // Enhanced validation
    if (!name || !email || !phone || !address || !password || !role) {
        return next(new ErrorHandler("All fields are required", 400));
    }

    if (!validateEmail(email)) {
        return next(new ErrorHandler("Invalid email format", 400));
    }

    if (!validatePhone(phone)) {
        return next(new ErrorHandler("Invalid phone number format", 400));
    }

    if (!validatePassword(password)) {
        return next(new ErrorHandler("Password must be at least 6 characters long", 400));
    }

    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        return next(new ErrorHandler("Please provide your preferred job niches", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email is already registered", 400));
    }

    const userData = {
        name,
        email,
        phone,
        address,
        password,
        role,
        niches: { firstNiche, secondNiche, thirdNiche },
        coverLetter,
    };

    try {
        if (req.files?.resume) {
            userData.resume = await handleResumeUpload(req.files.resume);
        }

        const user = await User.create(userData);
        sendToken(user, 201, res, "User Registered");
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, address, coverLetter, firstNiche, secondNiche, thirdNiche } = req.body;

    // Validate email and phone if provided
    if (email && !validateEmail(email)) {
        return next(new ErrorHandler("Invalid email format", 400));
    }

    if (phone && !validatePhone(phone)) {
        return next(new ErrorHandler("Invalid phone number format", 400));
    }

    const newUserData = {
        name,
        email,
        phone,
        address,
        coverLetter,
        niches: {
            firstNiche,
            secondNiche,
            thirdNiche,
        }
    };

    if (req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        return next(new ErrorHandler("Please provide all preferred job niches", 400));
    }

    try {
        if (req.files?.resume) {
            newUserData.resume = await handleResumeUpload(
                req.files.resume,
                req.user.resume?.public_id
            );
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            newUserData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(200).json({
            success: true,
            user,
            message: "Profile Updated",
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 500));
    }
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
        return next(new ErrorHandler("All password fields are required", 400));
    }

    if (!validatePassword(newPassword)) {
        return next(new ErrorHandler("New password must be at least 6 characters long", 400));
    }

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (newPassword !== confirmPassword) {
        return next(new ErrorHandler("New password & confirm password do not match", 400));
    }

    user.password = newPassword;
    await user.save();
    sendToken(user, 200, res, "Password updated successfully");
});

// Other functions remain the same
export const login = catchAsyncErrors(async (req, res, next) => {
    const { role, email, password } = req.body;
    
    if (!role || !email || !password) {
        return next(new ErrorHandler("Email, password and roles are required", 400));
    }
    
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    
    if (user.role !== role) {
        return next(new ErrorHandler("Invalid user role", 400));
    }
    
    sendToken(user, 200, res, "User logged in successfully");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out successfully.",
        });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});