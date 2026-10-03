# VOLUNTEER+

## Digital Volunteer Management & Social Service Coordination Platform

VOLUNTEER+ is a professional frontend-only college mini project / prototype that demonstrates a digital workflow connecting volunteers, NGOs/organizations, event coordinators and administrators.

### Problem Statement

Community organizations may coordinate volunteering through scattered WhatsApp groups, Google Forms, paper attendance, spreadsheets and manual certificate processes. The prototype demonstrates how these activities can be presented in one responsive interface.

### Solution

The prototype covers the flow:

Volunteer account → discover events → view event details → register → organization sees volunteers → QR attendance demo → service-hour tracking → digital certificate placeholder.

### Features

- Responsive landing page
- Event discovery with search and category filtering
- Event details page
- Demo event registration
- Demo volunteer login / role routing
- Demo volunteer registration
- Volunteer dashboard
- QR attendance simulation without camera access
- Service-hour progress UI
- Digital certificate placeholder
- Organization portal
- Frontend-only create-event workflow
- Local demo QR visual
- Volunteer roster
- Admin dashboard
- Admin table search
- Toast notifications and modals
- Mobile navigation
- Accessibility-friendly labels, focus states and semantic structure
- Content Security Policy on every HTML page
- No backend, database, API, authentication or payment integration

## User Roles

1. Volunteer
2. Organization / NGO
3. Event coordinator
4. Admin

## Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Local SVG assets

No React, Next.js, Vue, Angular, Node.js, PHP, MySQL, MongoDB, Firebase, Supabase or external authentication is used.

## Project Structure

```text
digital-volunteer-platform/
├── index.html
├── assets/
│   ├── images/
│   └── icons/
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── pages/
│   ├── events.html
│   ├── event-details.html
│   ├── login.html
│   ├── register.html
│   ├── volunteer-dashboard.html
│   ├── organization-portal.html
│   └── admin.html
├── README.md
└── SECURITY_AUDIT.md
```

## How to Run

Because this is a static frontend, `index.html` can be opened directly in a browser.

For a local static server, from the project root use any simple static server, for example VS Code Live Server. No build command is required.

## How to Deploy to Vercel

1. Put the project in a Git repository.
2. Import the repository into Vercel.
3. Select it as a static site / no framework.
4. Use the project root as the root directory.
5. No build command is required.
6. Deploy.

The internal links are relative, so the site is designed to work locally and on a static Vercel deployment.

## Frontend-only limitation

**This project is a frontend prototype and does not include a backend or real authentication.**

Forms are intercepted by JavaScript. No credentials, personal details or event data are transmitted to a server. Passwords are not stored. QR scanning is represented by a local visual placeholder and does not access a camera.

## Future Enhancements

- Secure backend and database
- Real authentication and role-based authorization
- Verified NGO onboarding
- Real QR generation and scanning
- Attendance validation
- Persistent service-hour records
- Automated certificate generation
- Notifications
- Reporting and analytics
- Secure API integration
- Privacy and consent controls
