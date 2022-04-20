const scheduleRequest = {
  "termCode": 2222,
  "courses": [{
    "courseID": "50444"
  }]
}

const scheduleImproperFormatRequest = {
  "termCode": 2222,
  "courses": [
    "50444"
  ]
}

module.exports = {
  scheduleRequest,
  scheduleImproperFormatRequest
}