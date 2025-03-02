// Simulated student database (replace with real data later)
const studentDatabase = {
    "226886": "Muhammad Areeb Asif BSCS 2022 FAST NU LHR",
    "123456": "Abdul Rafay Naveed BSEE 2021 FAST NU LHR",
  };
  
  function extractDetailsFromEmail(email) {
    // Regex to match emails like "l226886@lhr.nu.edu.pk"
    const emailRegex = /^l(\d{6})@lhr\.nu\.edu\.pk$/;
    const match = email.match(emailRegex);
  
    if (!match) {
      return null; // Email format is incorrect
    }
  
    const studentId = match[1]; // Extract student ID
    const studentInfo = studentDatabase[studentId];
  
    if (!studentInfo) {
      return null; // Student ID not found
    }
  
    return studentInfo; // Return full name
  }
  
  module.exports = extractDetailsFromEmail;
  