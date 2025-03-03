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
    // dept: {
    //   type: String,
    //   required: true,
    //   enum: [
    //     "COMPUTING",
    //     "MANAGEMENT",
    //     "ELECTRICAL ENGINEERING",
    //     "SCIENCES & HUMANITIES",
    //     "CIVIL ENGINEERING",
    //   ],
    // },
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
    campus: {
      type: String,
      required: true,
      enum: ["ISB", "KHI", "LHR", "PSH"],
    },
  },
  { timestamps: true }
);

const Server = mongoose.model("Server", serverSchema);
module.exports = Server;
