# CruzCal

Check out the [Figma](https://www.figma.com/file/nP5Z4Ugc0p9pnBaqNrtMS4/CruzCal?node-id=96%3A26 ) for the designs

Check out the [how-to guide](HOW-TO-GUIDE.md) on the site's features

## What is CruzCal?

A productivity tool for UC Santa Cruz students. CruzCal lets users select their Class and produce calendar files based on the class events they can import to their preferred calendar. Users will also be able to import this Calendar to Calendar apps (built-in OAuth Consent).

## What is the goal?

Help students save time! Manually enter recurring events with all the important course information to a calendar each quarter can be annoying. We offer a simple method to go from just your list of courses to a complete calendar with recurring events for lectures and sections. Our ideal goal is integrating our service to allow students to directly sync their calendars with their registered courses.

## How is this done?

We scrape the information from SlugSurvival and build our database of classes with regular updates to make sure class information is up to date. This database is then used to pull data whenever the user makes a request. We then use a calendar module to generate a .ics file or give the option to the user to log in with Google and add to their Google Calendar.

## Getting Started

### Prerequisites

- Node.js v16
- psql: PostgreSQL interactive terminal
- yarn: Node.js package manager

### Clone Repo

```bash
> git clone https://github.com/tanmaymittal/cruzcal.git
```

### Install dependencies and build database

```bash
> cd cruzcal
> yarn
```

## Define backend environment variables

The following environment variables must be defined in `backend/`...

Postgres Sequelize DB:

- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_HOST

Google Calendar API (with userinfo.email, userinfo.profile, and calendar scopes):

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

Path variables:

- GOOGLE_AUTH_REDIRECT="/api/auth/google/redirect"
- GOOGLE_AUTH_URL="/api/auth/gooogle"

A session secret for encrypted cookies:

- SESSION_SECRET

### Run automated backend and frontend unit tests

```bash
> yarn test
```

### Begin development environment

```bash
> yarn start
```

## Product Backlog

- [ ] As a user, I want to search for a class using a search bar that automatically queries classes based on subject, class name, or both
- [ ] As a user, I want to store and retrieve multiple schedules within CruzCal
- [ ] As a user, I want to be able to create schedule groups with my friends to find common availabilities
- [ ] As a user, I want to see the mandatory/optional section times for a class

## Team

Tanmay Mittal
Kitana Toft
Andrew Lim
Pablo Gaeta
Mario Reyes
