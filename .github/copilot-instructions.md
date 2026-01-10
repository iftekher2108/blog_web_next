# Copilot / AI Agent Instructions — blog_web_next

Purpose: concise, actionable guidance for code-generating agents working on this repository.

- Big picture
  - This is a Next.js (app-router) project. The main application lives under `app/` and uses routed segments: `app/(admin)` (admin panel) and `app/(main)` (public site).
  - Server/API code uses Next.js Route Handlers under `app/api/**` (export `GET`, `POST`, etc.) and returns `NextResponse`.
  - MongoDB + Mongoose is the primary persistence. Connection helper: `lib/Database.js` — call `await Connection()` at the start of route handlers.
  - Models live in `model/*.model.js` and use `mongoose.models.Model || mongoose.model(...)` to avoid model re-definition on hot reload.

- Key workflows & commands
  - Development: `npm run dev` (uses `next dev --turbopack`).
  - Build: `npm run build` and `npm run start` for production.
  - Lint: `npm run lint`.
  - Env: set `MONGODB_URL` for DB connection. File uploads return public paths under `public/`.

- Project-specific patterns to follow
  - API routes validate input with `zod` schemas located next to the route (e.g. `app/api/admin/blog/blogSchema.js`). Use the same zod patterns and return consistent JSON with `NextResponse.json(...)`.
  - File uploads are parsed from `formData()` in route handlers and processed by the helper at `helper/upload.js`. Expect `picture` and `banner` form fields.
  - Each route explicitly calls `await Connection()` (do not assume a global connection). Keep this call in server handlers.
  - Models reference ObjectId relations (e.g. `created_by` references `User`). Use `.populate(...)` when a handler needs related documents.
  - Admin UI uses React Context providers under `app/(admin)` (see `userContext.jsx`, `statusContext.jsx`) — prefer updating context for auth/status flows.

- Integration points & external libs
  - Mongoose (see `lib/Database.js` and `model/*.model.js`).
  - Zod for validation (`app/api/**/*Schema.js`).
  - TinyMCE for rich text (`@tinymce/tinymce-react`, assets in `public/tinymce/`).
  - Tailwind + daisyUI for styling (global CSS at `app/globals.css`).

- Examples (patterns to copy)
  - API GET list + single-item pattern: check `app/api/admin/blog/route.js` — it reads query params, calls `await Connection()`, and returns `{ blogs }` or `{ blog }` depending on `id`.
  - Zod schema usage: `blogSchema.parse({...})` in `app/api/admin/blog/blogSchema.js` — mirror this pattern when adding new routes.
  - Model pattern: `const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);` — use this to prevent duplicate models during HMR.

- Safe edits & expectations for agents
  - Do not change global conventions (routing, DB pattern, zod validation) without confirming with a human.
  - When adding routes, follow existing folder structure: `app/api/<area>/<resource>/route.js` + optional `*Schema.js` and tests.
  - Keep responses consistent: use `NextResponse.json(body, { status })` and include helpful message fields when appropriate.

If any part of this guidance is unclear or you want more examples (e.g. adding an authenticated admin route, or the upload helper contract), tell me which area to expand.
