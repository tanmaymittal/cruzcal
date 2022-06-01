# Release Plan
**Product name**: CruzCal
**Team Name**: CruzCal Developers
**Team Members**: Tanmay Mittal, Kitana Toft, Mario Reyes, Pablo Gaeta, Andrew Lim
**Release Name**: 1.0
**Release Date**: Tuesday, May 31, 2022
**Revision Number**: 0.2
**Revision Date**: Tuesday, May 31, 2022

## High Level Goals (priority order)
Be able to generate calendar events based on UCSC courses during a quarter
Different options to store calendar: .ical/.ics file, import to other applications, save in web app
Calendar preview while adding courses to create a course calendar
Continuous Integration - Working version and testing during development
Automatically create and import calendar events to Google Calendar using OAuth
Smart search for courses (e.g. course number, name, or department w/ suggestions)
Unit and end-to-end testing before implementation
Save calendar and past calendars
Groups where students can merge their calendars to check availabilities

## User Stories for Release
### Sprint 1 (4/06/22 - 4/19/22) - Bare Bones
Team goal: Establish a bare bones skeleton for web application. Ability to perform simple course queries.
User Stories:
As a student, I want to search for available courses during the term I’m interested in.
As a student, I want to see course information for classes that I enter.
Sprint 2 (4/20/22 - 5/03/22) - Initial Product
Team goal: Ability to lookup and add/remove classes to CruzCal. The web application is more interactive. Get schedule information for selected classes.
User stories
As a student, I want to dynamically add and remove courses from my schedule.
As a student, I want to generate a calendar resource scheduling all of my courses so I don’t have to manually create them every quarter.
Sprint 3 (5/04/22 - 5/17/22) -  Beta
Team goal: Ability to see a schedule preview and export multiple schedules as JSON, .ics and/or as Google Calendar, and get help with class conflicts.
User Stories:
As a student, I want to see a calendar preview so I can visualize my schedule as I add courses to CruzCal.
As a student, I want to have multiple options for download formats depending on my preference.
As a student, I want to be able to see if any of my selected courses have time conflicts.
As a student, I want to be able to save multiple calendars for current and future quarters.
Sprint 4 (5/18/22 - 5/31/22) - Perfecting for Release / Stretch Goals
Team Goal: Complete the current backlog, add and/or update unit tests, prepare for final presentation, and optionally attempt our stretch goal once project release is ready for launch.
Stretch Goal: Notify users of asynchronous classes, search suggestions, export/import calendars from other users within the web app, save history of schedule changes
User Stories:
As a user, I want guidance on how to use the site
As a student, I want to be informed when a class I’ve selected doesn’t have scheduled meeting times, since this means they won’t appear on my calendar
As a student, I want to be provided with suggestions to speed up my course searches
As a student, I want to be able to share and view my friends’ schedules easily
As a user, I want to be able to undo/redo my course selection changes in case I make a mistake

Product Backlog
User Stories:
As a user, I want to search for a class using a search bar that automatically queries classes based on subject, class name, or both
As a user, I want to store and retrieve multiple schedules within CruzCal
As a user, I want to be able to create schedule groups with my friends to find common availabilities
As a user, I want to see the mandatory/optional section times for a class

Project Presentation
Goal: Have a final presentation ready by Tuesday, May 31, 2022 and uploaded to the final presentation folder. This includes all finished documentation: System and Unit Test Report, Working Prototype Known Problems Report, and Final Presentation with recorded demos.
