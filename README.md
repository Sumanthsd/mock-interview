# QA Automation Mock Interview

A maintainable React/Vite mock-interview application with separated pages, components, question banks, services, utilities, and Vercel API endpoints.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown by Vite.

## Build

```bash
npm run build
```

## Vercel

Deploy the project root to Vercel. Keep these environment variables in Vercel:

- DATABASE_URL
- ADMIN_EMAIL
- ADMIN_PASSWORD
- ADMIN_TOKEN_SECRET
- VITE_API_BASE_URL (optional)

The included API files are starter endpoints. Connect them to your existing Neon schema before using shared persistence in production.

## Project structure

- `src/pages` - application screens
- `src/components` - reusable UI
- `src/data` - question banks
- `src/services` - API/business service layer
- `src/utils` - scoring and selection logic
- `src/styles` - styling
- `api` - Vercel serverless API endpoints

No secrets are committed to this repository.
