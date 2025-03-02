const mongoose = require("mongoose");
const { Schema } = mongoose; 

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/userpfp.png",
    },
    bio: {
      type: String,
      default: "Hey there fellow Fastians! I am using NucesBuzz",
    },
    batch: {
      type: String,
      required: true,
    },
    academicDegree: {
      type: String,
      required: true,
      enum: ["BS", "MS", "PhD"],
    },
    dept: {
      type: String,
      required: true,
      enum: [
        "COMPUTING",
        "MANAGEMENT",
        "ELECTRICAL ENGINEERING",
        "SCIENCES & HUMANITIES",
        "CIVIL ENGINEERING",
      ],
    },
    major: {
      type: String,
      required: true,
      enum: [
        "BS (Business Analytics)",
        "BS (Accounting & Finance)",
        "BS (Computer Science)",
        "BS (Data Science)",
        "BS (Software Engineering)",
        "BS (Electrical Engineering)",
        "BS (Civil Engineering)",

        "MS (Accounting & Finance)",
        "Master of Business Administration",
        "MS (Business Analytics)",
        "MS (Computer Science)",
        "MS (Data Science)",
        "MS (Software Project Management)",
        "MS (Electrical Engineering)",
        "MS (Civil Engineering)",
        "MS (Mathematics)",
        "MS (English Language Teaching)",
        "MS (Applied Linguistics)",

        "PhD (Management Sciences)",
        "PhD (Civil Engineering)",
        "PhD (Computer Science)",
        "PhD (Electrical Engineering)",
        "PhD (Mathematics)",
      ],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
