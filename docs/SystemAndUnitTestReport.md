# System and Unit Test Report

**Product name**: CruzCal
**Team Name**: CruzCal Developers
**Team Members**: Tanmay Mittal, Kitana Toft, Mario Reyes, Pablo Gaeta, Andrew Lim
**Release Name**: 1.0
**Release Date**: Monday, May 23, 2022
**Revision Number**: 0.3
**Revision Date**: Tuesday, May 31, 2022

## Building and Running Tests

Our application may be easily built, tested and executed using the following instructions.

### Prerequisites
- [psql](https://www.postgresql.org/): PostgreSQL interactive terminal [(Download)](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/en/) package manager (yarn preferred)

---

#### Clone Repo
```
git clone https://github.com/tanmaymittal/cruzcal.git
```

#### Install dependencies and build database
```
cd cruzcal
yarn
```

#### Run automated backend and frontend unit tests
```
yarn test
```

#### Begin development environment
```
yarn start
```

---

## Back End System Tests
### Application Build
- [Express](https://expressjs.com/en/4x/api.html) (Minimal framework for defining HTTP endpoints and inserting middleware)
- [ics](https://www.npmjs.com/package/ics) (Node package for creating iCalendar events and files)
- [Axios](https://axios-http.com/docs/intro) (HTTP Client for Node)
- [Sequelize](https://sequelize.org/) (ORM for PostgreSQL)
- [Passport](https://www.npmjs.com/package/passport) (User Authentication (including OAuth 2.0))
- [Jest](https://jestjs.io/docs/api) (Testing framework for Node)
- [Supertest]() (HTTP Client with assertions for testing)

## Front End System Tests
### Application Build
- [Next.js](https://nextjs.org/) (React framework)
- [React](https://reactjs.org/) (Javascript library UI)
- [Tailwind CSS](https://tailwindcss.com/) (CSS framework)
- [Jotai](https://jotai.org/) (State management)
- [Nx](https://nx.dev/) (Monorepo management tool)
- [Jest](https://jestjs.io/docs/api) (Testing framework for Node)


### Frontend unit tests
Components
  - [`calendar-view.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/calendar-view/calendar-view.spec.tsx) (ANDREW)
    - Equivalence classes:
      <!-- - TODO: Add desc -->
    - Tests
      - “should render successfully”
      - “should render new courses when a course is added”
      - “should remove courses when a course is deleted”
      - “should update the months a term covers when a new Term is selected”

  - [`combobox-select.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/combobox-select/combobox-select.spec.tsx) (PABLO)
    - Equivalence classes:
      - default combobox-select with no selection or options
      - Selection is null
      - Renders valid selection
      - Type full option and select
      - Type partial option and select
      - Type non-existent option

    - Tests
      - “should render successfully”
      - “Null selection”
      - “Example selection”
      - “Type in full selection input”
      - “Partial type, select from dropdown options”
      - “Type in incorrect input”

- [`CSFilters.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/course-selection/CSFilters.spec.tsx) (PABLO)
  - **Note**: wrapper class of combobox, so not many new cases
  - Equivalence classes:
    - Render null and valid course selection
    - Render null and valid term filter
  - Tests
    - “default course selection”
    - “example course selection”
    - “default term filter”
    - “example term filter”

- [`CourseSelection.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/course-selection/CourseSelection.spec.tsx) (PABLO)
  - Equivalence classes:
    - All allowed states of term,subject,course checked
    - Modify selected subject
  - Tests
    - “no term, subject course selection”
    - “term, no subject or course”
    - “term, subject and no course”
    - “term, subject and course”


- [`CourseSelectionList.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/course-selection/CourseSelectionList.spec.tsx) (PABLO)
  - Equivalence classes:
    - Renders null course selection
    - Single row course selection
    - Multiple rows of course selection
    - Add and remove course selections
    - Modify selected term
  - Tests
    - “default course selection”
    - “No trash for single course”
    - “Add classes”
    - “Add + Remove classes”
    - “Select term from dropdown”

- [`footer.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/footer/footer.spec.tsx) (KITANA)
  - Equivalence classes:
    - Validated that the footer renders successfully.
  - Tests
    - “should render successfully”

- [`header.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/header/header.spec.tsx) (KITANA)
  - Equivalence classes:
    - Validated that the header renders successfully.
    - Verified text matches what’s expected:  “CruzCal”.
  - Tests
    - “should render successfully”

- [`info-box.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/info-box/info-box.spec.tsx) (Kitana)
  - Equivalence classes:
    - Validated that the header renders successfully.
    - Validate that the following text appears: “Warning: Term Selection”
    - Simulate user click on warning drop down dialog
    - Validate that the following text appears: “After selecting course”
  - Tests
    - “should render successfully”
    - “User opens warning dialog drop down”

- [`information-pane.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/information-pane/information-pane.spec.tsx) (KITANA)
  - **Note**: wrapper class of info-box, so not many new cases
  - Equivalence classes:
    - Validates that the information-pane renders successfully.
    - Validates user clicks on question mark icon
    - Validates after clicks on button
    - Validates that infor-box component appears
    - Validates the following text renders: “Warning: Term Selection”
  - Tests
    - “should render successfully”
    - “question mark icon appears”
    - “user clicks on ? icon”

- [`online-classes-dialog.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/online-classes-dialog/online-classes-dialog.spec.tsx) (ANDREW)
  - Equivalence classes:
  <!-- - TODO: Add desc -->
  - Tests
  <!-- - TODO: Add desc -->

- [`warning-dialog.spec.tsx`](https://github.com/tanmaymittal/cruzcal/blob/main/frontend/apps/cruzcal/app/warning-dialog/warning-dialog.spec.tsx) (KITANA)
  - Equivalence classes:
    - Load added classes before all tests; success and attributes validated
    - Validates that the warning dialog does not appear on screen
    - Validates that the warning dialog appears on screen
  - Tests
    - Loads two courses into the course selection list that have no conflicts.
    - “No conflicting classes”
    - Loads two courses into the course selection list that have conflicts.
    - “two conflicting classes”

---

## Backend unit tests
### Database (in backend/src/__tests__/db)

- [`connection.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/db/connection.test.js) (PABLO)
  - Equivalence classes:
    - Working postgres database and valid sequelize models
  - Tests
    - “Check DB connection”

- [`Term.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/db/Term.test.js) (PABLO)
  - Equivalence classes:
    - Valid term row with unique primary key
    - Duplicate primary key
    - Incorrect type on term code attribute
    - Select non-existent term in database
  - Tests
    - Load terms before all tests; success and attributes validated
    - “Insert duplicate key termcode”
    - “Insert term with incorrect attribute type”
    - “Select * Terms”
    - “Select Term by Primary Key”
    - “Select non-existent term”

- [`CourseInfo.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/db/CourseInfo.test.js) (PABLO)
  - Equivalence classes:
    - Valid term inputs with unique composite key
    - Non-existent foreign key termcode
    - Violate refnum NOT NULL constraint
    - Duplicate primary key
    - Selection of all 4 combinations of valid/invalid CRN and term
  - Tests:
    - Load courses before all tests; success and attributes validated
    - "Insert invalid termcode fk"
    - "Insert validation error (missing refnum)"
    - “Insert duplicate key refnum,termcode”
    - "Select *"
    - "Select by CRN and term"
    - “Select invalid CRN, valid term”
    - “Select valid CRN, invalid term”
    - "Select invalid CRN and term"

  ### Server (in backend/src/__tests__/app)

- [`app.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/app.test.js) (PABLO)
  - Equivalence classes:
    - App loads (Valid openapi schema and route handlers are defined)
    - Valid unprotected endpoint
    - Non-existent endpoint
    - Unauthenticated access to protected endpoints
    - Authenticated access to protected endpoints
  - Tests:
    - “Check api docs exists”
    - “Invalid endpoint”
    - “Check api version is a number”
    - “Check unauthenticated user”
    - “Check user logout redirect”

- [`calendar.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/calendar.test.js) (MARIO)
  - Equivalence classes:
    - Valid term and two courses
  - Tests:
    - “Generate unique name for calendar”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “GET /api/terms” (PABLO)
  - Equivalence classes:
    - No parameters
  - Tests:
    - “success 200”
    - “responds with JSON, check structure”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “GET /api/subjects” (PABLO)
  - Equivalence classes:
    - No parameters
    - Valid termCode parameter
    - Non-existent termCode parameter
    - Incorrect type for termCode parameter
  - Tests:
    - “success with no parameters”
    - “failure with invalid term”
    - “failure with invalid term type”
    - “success with valid term”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “GET /api/courses” (PABLO)
  - Equivalence classes:
    - Valid term and subject parameter
    - No parameters
    - Only valid term parameter
    - Only valid subject parameter
    - Valid term, Invalid subject
    - Invalid subject, valid term
    - Invalid subject and term
    - Invalid term type
  - Tests:
    - “success 200 with valid term and subject”
    - “error with no parameters”
    - “error with term parameter only”
    - “error with subject parameter only”
    - “error with invalid term arg”
    - “error with invalid subject arg”
    - “error with invalid term and subject arg”
    - “error with invalid term arg type”
    - “responds with JSON, check structure”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “POST /schedule/{type}” (MARIO / PABLO)
  - Equivalence classes:
    - Valid term and single courseID
    - Valid term and multiple courseIDs
    - invalid term
    - invalid courseID
    - invalid term type
    - invalid courseID type
  - Tests:
    - “success 201, valid schedule request”
    - “responds with JSON of courses”
    - “validate structure of multiple course schedule”
    - “404 error for invalid term”
    - “404 error for invalid courseID”
    - “400 error for incorrect request”
    - “400 error for invalid term type”
    - “400 error for invalid courseID type”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “GET /api/calendar/*” (PABLO)
  - **Note**: Not intended to check a particular endpoint, but instead verify middleware catches correct errors for parameters to all calendar fetch endpoints
  - Equivalence classes:
    - Missing term and courseIDs, missing either one
    - incorrect term
    - incorrect courseIDs
  - Tests:
    - “error 400, missing term and courseIDs”
    - “error 400, missing term”
    - “error 400, missing courseIDs”
    - “error 404, incorrect term”
    - “error 404, incorrect courseIDs”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “GET /api/calendar/json” (MARIO / PABLO)
  - Equivalence classes:
    - Valid term and single courseID with scheduled meeting times
    - Valid term and multiple courseIDs with scheduled meeting times
    - Validalid term and courseIDs with no scheduled meeting times
  - Tests:
  - “success 200, valid termCode and courseIDs query”
  - “Course has no meeting times”
  - “validate structure of single course schedule”
  - “validate structure of multiple course schedule”

- [`endpoints.test.js`](https://github.com/tanmaymittal/cruzcal/blob/main/backend/src/__tests__/app/endpoints.test.js) : “GET /api/calendar/ics” (MARIO)
  - Equivalence classes:
    - Valid ICS request with term code and one course
    - Invalid ICS request with course that has no meeting time
  - Tests:
    - “Success 200, valid ICS request”
    - “course has no meeting times”
    - “responds with text/calendar data”
    - “validate calendar event data”

---

## Sprint 1 System Tests
**User stories** (verify completed):
  - As a student, I want to search for available courses during the term I’m interested in
  - As a student, I want to see course information for classes that I enter.

**Scenario** (at end of sprint 1, we can probably modify to show completion with our final product)
1. start `CruzCal app`; visit the `/api/docs` endpoint (i.e. [https://cruzcal.com/api/docs](https://cruzcal.com/api/docs) )
    1. Expand the `/api/terms` section
        1. Click “*Try it out*”; Click “*Execute*”
        1. The request sent is displayed and the available terms that CruzCal is tracking are returned
        1. Choose the 2022 Summer Quarter, which has term code 2224
    1. expand the /api/courses section
        1. Click “*Try it out*”; Enter the term code from **1.3**, 2224; Click “*Execute*”
        1. The available courses for the term are returned, including information about lecture meetings times
    1. Browse for courses that seem interesting
1. record the courseIDs for courses of interest;
    1. Expand the /api/schedule section
        1. Click “Try it out”
        1. Replace the default term code with the selected term
        1. Replace the array items with courseIDs
        1. courseIDs are entered one per line line, followed by a comma
        1. Click “Execute”

---

## Sprint 2 System Tests
**User stories** (verify completed):
  - As a student, I want to dynamically add and remove courses from my schedule
  - As a student, I want to generate a calendar resource scheduling all of my courses so I don’t have to manually create them every quarter

**Scenario**:
1. start `CruzCal app`; visit the / endpoint (i.e. [https://cruzcal.com/](https://cruzcal.com/) );
1. Find the `Select Schedule` section (In the `Add Course` tab on mobile)
    1. select `Select Term`; type or click on chevron arrow (^) to expand term options.
        1. **i.e.**: type or select 2022 Summer Quarter
    1. select first subject  `Select Subject`; type or click on chevron arrow (^) to expand subject options.
        1. **i.e.**: type or select AM
    1. select first course `Select Course`; type or click on chevron arrow (^) to expand course options.
        1. **i.e.**: type or select 20 - 01: Math Methods II
    1. click on the plus sign (+) button to select a new course
    1. select second subject, CSE
    1. select second course, 115A - 01: Intro Software Eng
    1. User decides they don’t want to take a math class and clicks the trash icon on the right of the first row to remove AM 20 - 01 : Math Methods II
1. Find the `Export Calendar` section below the course scheduler
    1. Click the `JSON` button
    1. A new browser window pops up with the selected term and course data
    1. The URL provides a deep link to the JSON resource and can be re-downloaded by entering the URL in a browser or programmatically by fetching the resource

---

## Sprint 3 System Tests
**User stories** (verify completed):
  - As a student, I want to be able to save multiple calendars for current and future quarters
  - As a student, I want to see a calendar preview so I can visualize my schedule as I add courses to CruzCal
  - *NEW*: As a student, I want to have multiple options for download formats depending on my preference
  - *NEW*: As a student, I want to be able to see if any of my selected courses have time conflicts

**Scenario**:
1. start CruzCal app; visit the / endpoint (i.e. [https://cruzcal.com/](https://cruzcal.com/))
1. Find the `Select Schedule` section (In the `Add Course` tab on mobile)
    1. select `Select Term`; type or click on chevron arrow (^) to expand term options.
        1. i.e: type or select 2022 Spring Quarter
      1. select first subject  `Select Subject`; type or click on chevron arrow (^) to expand subject options.
        1. i.e: type or select CSE
    1. select first course  `Select Course`; type or click on chevron arrow (^) to expand course options.
        1. i.e: type or select 115A - 01 : Intro Software Eng
1. Find the calendar preview display (In the `Calendar` tab on mobile)
    1. The user’s CSE 115A class should appear on the calendar at the correct time
    1. Other classes added to the course schedule will also appear on this preview
1. Find the “Export Calendar” section below the course scheduler
    1. The user prefers to have their course schedule synced with their other Google Calendar events, so they decide to use the “Google” option over JSON and .ics
    1. Click the `Google` button
    1. If this is the first time adding a calendar to Google Calendar
        1. a popup appears requesting authorization to the user’s public Google profile and Calendar
        1. Click the checkbox requesting edit access to the user’s Google Calendar;
        1. Click “Continue”; The popup window will automatically close
    1. The requested schedule is named base of the term and courses and added to the user’s Google Calendar
    1. Once all events in the user’s Google Calendar have been created, the first created event is opened in a new window
1. Now that the calendar has been added to the user’s Google Calendar, the user may proceed making a new course schedule for the same term or a previous/future term


**Scenario** (conflict):
1. start CruzCal app
    1. select term 2022 Summer Quarter
    1. select first subject AM
    1. select first course 20 - 01: Math Methods II
    1. click on the plus sign (+) button to select a new course
    1. select second subject ANTH
    1. select second course 2 - 01: Intr Culturl Anthro
1. User should see the two classes wrapped in red circles and a red button labeled “See schedule conflicts” because these two courses have a scheduling conflict
1. click on the red button labeled “See schedule conflicts”
1. User should see a dialog render with a list of the classes that have scheduling conflicts.
1. User can click on the red button labeled “Got it, thanks!” to close the dialog.
1. User can then decide to either remove a class with the time conflict using the trash can icon.

---

## Sprint 4:
**User stories** (verify completed):
- As a user, I want help on the basic usage of the site
- *NEW*: As a student, I want to be informed when a class I’ve selected doesn’t have scheduled meeting times, since this means they won’t appear on my calendar
- As a student, I want to be able to search for class via the class name rather than having to rely on what the CRN (class registration number)
- Replacement suggestion: As a student, I want to be provided with suggestions to speed up my course searches
- As a student, I want to be able to view my friends’ schedules and compare them with my own (similar to when2meet)
- Replacement suggestion: As a student, I want to be able to share and view my friends’ schedules easily
- As a user, I want to be able to undo/redo my course selection changes in case I make a mistake

**Scenario** (informational pane for basic usage):
1. start CruzCal app
1. click on the question mark (?) icon
1. User should see the information-pane dialog appear; click on label “Warning” to see more.

**Scenario** (create schedule with asynchronous class and share):
1. start CruzCal app
    1. select ‘Select Term’; type or click on chevron arrow (^) to expand term options.
        1. i.e: type or select 2022 Summer Quarter
    1. select first subject  ‘Select Subject’; type or click on chevron arrow (^) to expand subject options.
        1. i.e: type or select ANTH
    1. select first course  ‘Select Course’; type or click on chevron arrow (^) to expand course options.
        1. i.e: type or select 1 - 01: Intro Biolog Anth
    1. User should see a warning yellow button labeled “Asynchronous Classes” render.
    1. This happened because in Summer 2022, 1 - 01: Intr Culturl Anthro is an Asynchronous online course
1. click on the yellow button labeled “Asynchronous Classes”
    1. User should see a dialog render with a list of the classes that don’t have scheduled meeting times.
    1. User can click on the yellow button labeled “Got it, thanks!” to close the dialog.
1. Now that the user is aware these courses won’t appear on their calendar, they can continue making their course schedule
1. The user knows they are enrolled in another lower-level ANTH course on Cultural Anthropology, but can’t remember the exact name, so they
    1. click on the plus sign (+) button to select a new course
    1. select the subject ANTH
    1. start typing “cultur…” in the Course combobox
    1. User should now see suggestions of possible courses to choose from
    1. User remembers they want Intr Culturl Anthro and click on this option
    1. The course is now selected and should appear on the calendar preview
1. The user wants to branch out and try a programming course, so they test out adding CSE 30 - 01: Prog Abs Python
    1. After adding the class, a conflict appears so they will be unable to add this course
    1. To undo this selection, they may press their browser’s back button
    1. After clicking the back button, the course is removed from their selection list
1. Now the user has decided they are satisfied with their final schedule
1. User wants to share their schedule with a friend who is building their schedule on CruzCal; Find the “Export Calendar” section (in the “Add Course” tab on mobile)
    1. Click the “Copy” button to the right of the link to automatically copy the share link text to the system clipboard
1. User sends this link to their friend and opening the link in a browser will render the same schedule.
