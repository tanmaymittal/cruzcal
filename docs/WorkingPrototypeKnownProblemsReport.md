# Working Prototype Known Problems Report

**Product name**: CruzCal
**Team Name**: CruzCal Developers
**Team Members**: Tanmay Mittal, Kitana Toft, Mario Reyes, Pablo Gaeta, Andrew Lim
**Release Name**: 1.0
**Release Date**: Monday, May 23, 2022
**Revision Number**: 0.1
**Revision Date**: Tuesday, May 31, 2022

**Description**: Known problems listed by domain:

---

## e2e issues

If the google api call during Google Calendar submission fails due to…
network connection
  - incorrect events format (this might be handled)
  - the user refuses the calendar scope when authorizing with google

Then the submission will fail silently

Clicking the “Google” button adds course events to Google Calendar and redirects to the. On first submission, authorization is required through Google which causes the redirect to be blocked.

The slugsurvival API doesn’t track all terms and has ambiguous naming, so only a single session is tracked for summer quarters (and we don’t know which).
For example:

  - “2022 Summer Quarter” actually refers to the second session of the 2022 Summer Quarter

We were hoping to build our own scraper, so for the future we would be making this distinction without the constraint of the slugsurvival API.

---

## Backend issues
---

## Frontend issues
If following criteria are met on the frontend, submission fails silently
  - At least one partially complete or empty course row
  - No term selected

![dom exception](/docs/dom_error.png)

  - Default tests for Desktop and Mobile components “pass”, but getting this particular error for multiple components that utilize states/atom (i.e. Calendar, CourseSelectionList, OnlineClassesDialog, etc.)
    <!-- TODO:- Phrase this as a known potential issue if tests are written for the Mobile/Desktop components - Andrew Lim -->
    - Getting an act(...) error if tests are written for Mobile/Desktop components
