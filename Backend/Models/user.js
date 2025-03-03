const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    campus: {
      type: String,
      required: true,
      enum: ["ISB", "KHI", "LHR", "PSH"],
    },
    academicDegree: {
      type: String,
      required: true,
      enum: ["BS", "MS", "PhD"],
    },
    major: {
      type: String,
      required: true,
      enum: [
        "BS BA",
        "BS AF",
        "BS CS",
        "BS DS",
        "BS SE",
        "BS EE",
        "BS CE",

        "MS AF",
        "MBA",
        "MS BA",
        "MS CS",
        "MS DS",
        "MS SPM", //Software Project Management
        "MS EE",
        "MS CE",
        "MS Math",
        // "MS (English Language Teaching)",
        "MS LING",

        "PhD MS",  //Management Sciences
        "PhD CE",
        "PhD CS",
        "PhD EE",
        "PhD Math",
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
