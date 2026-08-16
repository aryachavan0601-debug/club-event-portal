# Club Event Portal

A full-stack web application that allows students to discover upcoming club events, create accounts, log in, and register for events.

## Features

- View upcoming club events
- User signup and login using Supabase Authentication
- Logout functionality
- Event detail pages
- Authenticated event registration
- Prevention of duplicate registrations
- Protected admin dashboard
- Role-based admin access
- Admin view of event registrations
- Responsive UI

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
  - Authentication
  - PostgreSQL Database

## Database Structure

### profiles

Stores additional information about users.

- `id`
- `full_name`
- `role`

Roles:
- `student`
- `admin`

### events

Stores club event information.

- `id`
- `title`
- `description`
- `event_date`
- `location`

### registrations

Stores event registrations.

- `id`
- `user_id`
- `event_id`
- `registered_at`

A unique constraint prevents the same user from registering for the same event multiple times.

## Application Flow

### Student

Signup → Login → Browse Events → View Event → Register

### Admin

Login → Admin Dashboard → View Registrations

## Setup

1. Clone the repository.

2. Install dependencies:

```bash
npm install

3. Create .env.local:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

4. Start the development server:
npm run dev
Open:
http://localhost:3000

Security:
Authentication is handled through Supabase Auth.
Event registration requires an authenticated user.
Admin access is restricted based on the user's role.
Duplicate registrations are prevented at the database level.
Environment variables are excluded from Git using .gitignore.

External References:
No external UI template was directly copied. The interface was implemented using Tailwind CSS with AI-assisted development guidance.



