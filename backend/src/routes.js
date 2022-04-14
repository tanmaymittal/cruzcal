const axios = require('axios');

const slugSurvivalUrls = {
  AVAILABLE_TERMS: `https://andromeda.miragespace.net/slugsurvival/tracking/available`,
  ALL_TERMS_INFO: `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms.json`,
  SUBJECTS_BY_TERM: `https://andromeda.miragespace.net/slugsurvival/data/fetch/terms/:term.json`,
  COURSES_BY_TERM: `https://andromeda.miragespace.net/slugsurvival/data/fetch/courses/:term.json`,
};

exports.getTerms = async (req, res) => {
  const termsRes = await axios.get(slugSurvivalUrls.ALL_TERMS_INFO);
  const terms = termsRes.data;
  const formattedTerms = terms.map((term) => {
    return { code: term.code, name: term.name };
  });

  res.send(formattedTerms);
};

exports.genSchedule = async (req, res) => {};

exports.genCalendar = async (req, res) => {};
