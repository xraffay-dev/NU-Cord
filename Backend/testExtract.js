const extractDetailsFromEmail = require("./utils/extractDetails");

// Test cases
const testEmails = [
  "l226886@lhr.nu.edu.pk",
  "l123456@lhr.nu.edu.pk",
  "random@gmail.com", // Invalid case
  "l999999@lhr.nu.edu.pk", // Unknown student ID
];

testEmails.forEach((email) => {
  console.log(`Testing: ${email}`);
  const details = extractDetailsFromEmail(email);
  console.log(
    details ? `Extracted Name: ${details}` : "Invalid Email or ID not found"
  );
});
