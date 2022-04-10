const express = require("express");
const axios = require("axios");

const app = express();

const mockData = {
  userInput1: {
    term: "2222",
    course: "CSE 130", // or "Prin Comp Sys Dsgn", 52147 (remove spaces and dashes)
  },
  userInput2: {
    term: "2220",
    course: "70071",
  },
};

const slugSurvivalUrlBySubject = `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/${mockData.userInput1.term}.json`;

app.get("/", (req, res) => {
  res.send("CruzCal!");
});

app.get("/courses", async (req, res) => {
  const { identifiers } = req.query;
  // Determine format of the class identifier
  if (identifiers) {
    const identifierInfo = identifiers.map((id) => {
      return processIdentifier(id);
    });
    res.json(identifierInfo);
  } else {
    const classDataPromise = await axios.get(slugSurvivalUrlBySubject);
    const classData = await classDataPromise.data;
    res.send(classData);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// Helpers
const getIdentifierType = (identifier) => {
  // Regex for subject and number, e.g. cse130 or cse 130
  const subjectAndNumReg = /[a-z]{2,}[ ]?\d{1,}/;
  // Regex for course number, e.g. 70071
  const courseNumReg = /^\d+$/;
  if (subjectAndNumReg.test(identifier)) {
    return "subjectAndNum";
  } else if (courseNumReg.test(identifier)) {
    return "courseNum";
  }
  return "courseName";
};

const processIdentifier = (identifier) => {
  const identifierType = getIdentifierType(identifier);
  if (identifierType === "subjectAndNum") {
    identifier = identifier.replace(/ /g, "");
  }
  return {
    identifier,
    identifierType,
  };
};
