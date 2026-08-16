# Club Event Portal

A full-stack web application for students to discover upcoming college club events, create an account, and register for events.

The project demonstrates a modern full-stack architecture using Next.js and Supabase, with authentication, database integration, event registration, duplicate-registration prevention, and role-based admin access.

---

## Project Overview

The Club Event Portal provides a centralized platform where students can discover and register for upcoming club events.

Students can:

- Create an account
- Log in and log out
- Browse upcoming events
- View detailed event information
- Register for events
- View their registered events

Administrators can access a protected admin dashboard to view event registrations.

---

## Features

### Student Features

- View upcoming club events
- View detailed event information
- Create an account using email and password
- Login using Supabase Authentication
- Logout
- Register for events
- Prevent unauthenticated users from registering
- Prevent duplicate registrations
- View personal event registrations
- Responsive user interface

### Admin Features

- Protected admin dashboard
- Role-based admin access
- View event registration information
- Restrict admin functionality to authorized users

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend / Services

- Supabase
  - Supabase Authentication
  - PostgreSQL Database
  - Row Level Security / database-level access control

### Deployment

- Vercel

### Development

- Git
- GitHub
- VS Code

---

## Database Structure

The application uses a PostgreSQL database through Supabase.

### `profiles`

Stores additional information associated with users.

| Column | Description |
|---|---|
| `id` | User ID linked to the authenticated user |
| `full_name` | User's name |
| `role` | User's application role |

Roles:

- `student`
- `admin`

---

### `events`

Stores information about club events.

| Column | Description |
|---|---|
| `id` | Unique event ID |
| `title` | Event title |
| `description` | Event description |
| `event_date` | Date and time of the event |
| `location` | Event location |

---

### `registrations`

Stores event registrations.

| Column | Description |
|---|---|
| `id` | Unique registration ID |
| `user_id` | ID of the registered user |
| `event_id` | ID of the registered event |
| `registered_at` | Registration timestamp |

A database-level unique constraint prevents the same user from registering for the same event multiple times.

---


## Application Flow

### Student Flow

Signup → Login → Browse Events → View Event → Register → My Registrations

### Admin Flow

Login → Admin Dashboard → View Event Registrations

## Authentication & Access Control

- User authentication is handled using Supabase Authentication.
- Users must be logged in to register for events.
- Unauthenticated users are redirected to the login page when attempting to register.
- Users can view their registered events through the My Registrations page.
- Admin functionality is restricted to authorized admin users.
- Duplicate registrations for the same event are prevented at the database level.
- Environment variables containing project configuration are excluded from Git.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/aryachavan0601-debug/club-event-portal.git
cd club-event-portal

### 2. Install dependencies

```bash
npm install

### 3. Configure environment variables

Create a `.env.local` file in the project root:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

Add the corresponding values from your Supabase project.

### 4. Start the development server

npm run dev

```Open:
[http://localhost:3000](http://localhost:3000)

Open:

[http://localhost:3000](http://localhost:3000)

---

## External References

No external UI template was directly copied.

The interface was implemented using Next.js and Tailwind CSS, with AI-assisted development guidance used for learning, debugging, implementation guidance, and UI development.

---

## GitHub Repository

[https://github.com/aryachavan0601-debug/club-event-portal](https://github.com/aryachavan0601-debug/club-event-portal)

---

## Live Deployment

The application is deployed using Vercel.

**Live URL:** To be added after deployment.

---

## Test Account

A test account will be provided for evaluating the deployed application.

### Student Account

Email: To be added  
Password: To be added

### Admin Account

Email: To be added  
Password: To be added

> Test credentials will be added before final submission.

