const mongoose = require("mongoose");
const { Schema } = "mongoose";

const serverSchema = new Schema(
  {
    batch: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      default: "/images/batchpfp.png",
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
  },
  { timestamps: true }
);

const Server = mongoose.model("Server", serverSchema);
module.exports = Server;
