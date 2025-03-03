const generateRandomPassword = require('./passwordGenerator');

const checkDegree = (token) => {
  const degreeList = new Set([
    "BS BA", "BS AF", "BS CS", "BS DS", "BS SE", "BS EE", "BS CE",
    "MS AF", "MBA", "MS BA", "MS CS", "MS DS", "MS SPM", "MS EE", "MS CE", "MS Math", "MS LING",
    "PhD MS", "PhD CE", "PhD CS", "PhD EE", "PhD Math",
  ]);

  let match = token.match(/^(BS|MS|PhD)([A-Za-z]+)/);
  if (!match) return [null, null];

  let academicDegree = match[1]; 
  let major = match[2]; 
  let fullDegreeName = `${academicDegree} ${major}`;

  if (degreeList.has(fullDegreeName)) {
    return [academicDegree, major];
  }

  console.log("Invalid academic degree or major.");
  return [null, null];
};

function extractDetailsFromEmail(profile) {
  const emailRegex = /^l(\d{6})@lhr\.nu\.edu\.pk$/;
  const match = profile.emails?.[0]?.value.match(emailRegex);

  if (!match) {
    console.error("Authentication failed: Invalid Email");
    return res.status(401).json({ error: "Authentication failed" });
  }

  console.log("Valid Email Entered.");

  const profileTokens = profile.name.familyName.split(" ");
  const degree = checkDegree(profileTokens[0]);

  const User = {
    name: profile.name.givenName,
    email: profile.emails?.[0]?.value,
    username: profile.emails?.[0]?.value.split("@")[0],
    password: generateRandomPassword(8),
    batch: profileTokens[1] || null, 
    campus: profileTokens[4] || null,
    academicDegree: degree[0],
    major: degree[0]+" "+degree[1],
  };

  return User;
}

module.exports = extractDetailsFromEmail;
