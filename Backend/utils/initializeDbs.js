const Batch = require("../Models/batch");
const Campus = require("../Models/campus");
const AcademicDegree = require("../Models/academicDegree");
const Major = require("../Models/major");

const initializeDbs = async (userDetails) => {
  try {
    console.log("Initializing databases for user:", userDetails);

    //Find or Create Campus
    let campus = await Campus.findOne({ name: userDetails.campus.toUpperCase() });
    if (!campus) {
      campus = await Campus.create({ name: userDetails.campus.toUpperCase(), address: "To be updated" });
      console.log(`Created new campus: ${campus.name}`);
    }

    //Find or Create Batch (linked to Campus)
    let batch = await Batch.findOne({ year: userDetails.batch, campus: campus._id });
    if (!batch) {
      batch = await Batch.create({ year: userDetails.batch, campus: campus._id });
      console.log(`Created new batch: ${batch.year}`);
    }

    //Find or Create Academic Degree (global, not batch-dependent)
    let academicDegree = await AcademicDegree.findOne({ name: userDetails.academicDegree.toUpperCase() });
    if (!academicDegree) {
      academicDegree = await AcademicDegree.create({ name: userDetails.academicDegree.toUpperCase() });
      console.log(`Created new academic degree: ${academicDegree.name}`);
    }

    //Find or Create Major (linked to AcademicDegree & Batch)
    let major = await Major.findOne({ name: userDetails.major.toUpperCase(), batch: batch._id });
    if (!major) {
      major = await Major.create({
        name: userDetails.major.toUpperCase(),
        academicDegree: academicDegree._id,
        batch: batch._id,
      });
      console.log(`Created new major: ${major.name}`);
    }

    console.log("All required entities are initialized!");

    return {
      batch: batch._id,
      campus: campus._id,
      academicDegree: academicDegree._id,
      major: major._id,
    };
  } catch (error) {
    console.error("Error in initializeDbs:", error);
    throw new Error("Failed to initialize related entities");
  }
};

module.exports = initializeDbs;
