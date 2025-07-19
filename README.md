# Apartment Planner & Expense Tracker 🏠💸

Hey! This is a project I made to help keep track of apartment stuff and split expenses for the inital move in.

## What is this?
A web app for managing apartment items, tracking who bought what, and making sure nobody forgets to pay their share. Built with React, TypeScript, Supabase, and TailwindCSS. Super chill, super useful.

## Features
- Add, edit, and filter apartment items (like a shopping list, but fancier)
- Track who owns what and how much it cost
- Shared budget summary (so you know when you’re out)
- Responsive UI (works on your phone during IKEA trips)
- 404 page for when you get lost (it happens)

## Setup
1. **Clone this repo:**
   ```bash
   git clone https://github.com/yourusername/apartment-planner.git
   cd apartment-planner
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```
3. **Set up Supabase:**
   - Make a free account at [supabase.com](https://supabase.com)
   - Create a new project and copy your API keys into `src/integrations/supabase/client.ts`
   - Run the SQL in `supabase/migrations/` to set up your tables
4. **Start the app:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```
5. **Open [localhost:5173](http://localhost:5173) and work**

## Tech Stack
- React + TypeScript
- Supabase (Postgres + Auth)
- TailwindCSS
- Vite


## Why?
Because splitting rent and shopping lists with roommates is a pain. This makes it less painful. Also, I wanted to learn Supabase and Tailwind.

## License
MIT. Use it, remix it, change it, whatever.