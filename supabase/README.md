# Supabase RSVP Setup

This folder prepares the database layer only. The frontend still uses localStorage until the RSVP flow is connected later.

## Run the SQL

1. Open your Supabase project dashboard.
2. Go to **SQL Editor**.
3. Open `supabase/migrations/create_rsvps_table.sql` in this project.
4. Copy the full SQL file.
5. Paste it into Supabase SQL Editor.
6. Click **Run**.

## Verify the Table

1. In Supabase, go to **Table Editor**.
2. Confirm there is a table named `rsvps`.
3. Confirm these columns exist:
   - `id`
   - `created_at`
   - `name`
   - `phone`
   - `email`
   - `guest_count`
   - `attendance`
4. Go to **Authentication > Policies** or the table's **RLS Policies** panel.
5. Confirm RLS is enabled and these policies exist:
   - `Allow public RSVP inserts`
   - `Allow temporary public RSVP reads`
   - `Allow temporary public RSVP deletes`

## Temporary Security Note

The public SELECT and DELETE policies are only for early admin dashboard testing. Replace them with authenticated admin-only access before using the dashboard for real guest data.
