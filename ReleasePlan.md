# Release Plan
**Product name**: CruzCal
**Team Name**: CruzCal Developers
**Team Members**: Tanmay Mittal, Kitana Toft, Mario Reyes, Pablo Gaeta, Andrew Lim
**Release Name**: 1.0
**Release Date**: Tuesday, May 31, 2022
**Revision Number**: 0.2
**Revision Date**: Tuesday, May 31, 2022

## High Level Goals (priority order)
1. Be able to generate calendar events based on UCSC courses during a quarter
1. Different options to store calendar: .ical/.ics file, import to other applications, save in web app
1. Calendar preview while adding courses to create a course calendar
1. Continuous Integration - Working version and testing during development
1. Automatically create and import calendar events to Google Calendar using OAuth
1. Smart search for courses (e.g. course number, name, or department w/ suggestions)
1. Unit and end-to-end testing before implementation
1. Save calendar and past calendars
1. Groups where students can merge their calendars to check availabilities

## User Stories for Release
1. [Sprint 1](#sprint-1-40622---41922---bare-bones) (4/06/22 - 4/19/22) - ***Bare Bones***
    a. **Team goal**: Establish a bare bones skeleton for web application. Ability to perform simple course queries.
    b. **User Stories**:
      1. As a student, I want to search for available courses during the term I’m interested in.
      1. As a student, I want to see course information for classes that I enter.

1. [Sprint 2](#sprint-2-42022---50322---initial-product) (4/20/22 - 5/03/22) - ***Initial Product***
  a. **Team goal**: Ability to lookup and add/remove classes to CruzCal. The web application is more interactive. Get schedule information for selected classes.
  b. **User stories**:
    1. As a student, I want to dynamically add and remove courses from my schedule.
    1. As a student, I want to generate a calendar resource scheduling all of my courses so I don’t have to manually create them every quarter.

1. [Sprint 3](#sprint-3-50422---51722---beta) (5/04/22 - 5/17/22) -  ***Beta***
  a. **Team goal*: Ability to see a schedule preview and export multiple schedules as JSON, .ics and/or as Google Calendar, and get help with class conflicts.
  b. **User Stories**:
    1. As a student, I want to see a calendar preview so I can visualize my schedule as I add courses to CruzCal.
    1. As a student, I want to have multiple options for download formats depending on my preference.
    1. As a student, I want to be able to see if any of my selected courses have time conflicts.
    1. As a student, I want to be able to save multiple calendars for current and future quarters.
1. [Sprint 4](#sprint-4-51822---53122---perfecting-for-release--stretch-goals) (5/18/22 - 5/31/22) - ***Perfecting for Release*** / ***Stretch Goals***
  a. **Team Goal**: Complete the current backlog, add and/or update unit tests, prepare for final presentation, and optionally attempt our stretch goal once project release is ready for launch.
  b. **Stretch Goal**: Notify users of asynchronous classes, search suggestions, export/import calendars from other users within the web app, save history of schedule changes
  c. **User Stories**:
    1. As a user, I want guidance on how to use the site
    1. As a student, I want to be informed when a class I’ve selected doesn’t have scheduled meeting times, since this means they won’t appear on my calendar
    1. As a student, I want to be provided with suggestions to speed up my course searches
    1. As a student, I want to be able to share and view my friends’ schedules easily
    1. As a user, I want to be able to undo/redo my course selection changes in case I make a mistake

## Product Backlog
**User Stories**:
1. As a user, I want to search for a class using a search bar that automatically queries classes based on subject, class name, or both
1. As a user, I want to store and retrieve multiple schedules within CruzCal
1. As a user, I want to be able to create schedule groups with my friends to find common availabilities
1. As a user, I want to see the mandatory/optional section times for a class

## Project Presentation
**Goal**: Have a final presentation ready by Tuesday, May 31, 2022 and uploaded to the final presentation folder. This includes all finished documentation: System and Unit Test Report, Working Prototype Known Problems Report, and Final Presentation with recorded demos.
