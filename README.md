# Marble Health Challenge

Contains the code necessary to complete the Marble Health interview challenge.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running Locally

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Make sure your local Postgres server is also up and running.
(Be sure to define the `DATABASE_URL` variable in your `.env` file.)

## Followups

The following changes are intended to be implemented:

- Add tests
- Add onSelectSlot() to add events by clicking on date/time slots
- Check shallow equality on event update to reduce unnecessary calls to API
