# LF Restaurant — Centralized Hotel Management (Ethiopia)

Step-by-step refinement plan. We do **one task at a time**, then **commit**, then move to the next.

---

## Task 1: Host database on your own Neon project
**Goal:** Stop using someone else's hosted database and use your own Neon PostgreSQL.

- [ ] **1.1** Create your Neon project:
  - Go to [neon.tech](https://neon.tech) → Sign up / Log in.
  - Create a new project (e.g. "lf-restaurant" or "ethiopia-hotels").
  - In the dashboard, copy the **connection string** (use the **pooled** one if shown).
- [ ] **1.2** Update `backend/.env`:
  - Set `DATABASE_URL` to your Neon connection string (must include `?sslmode=require`).
  - Keep `PORT=5000` and a strong `JWT_SECRET`.
- [ ] **1.3** Apply schema and seed (from repo root):
  ```bash
  cd "New LF restaurant/backend"
  npx prisma migrate deploy
  node prisma/seed.js
  ```
- [ ] **1.4** If you see **P1001 (Can't reach database server)**: Neon’s compute may be sleeping. The `DATABASE_URL` now includes `connect_timeout=15`. Open your [Neon dashboard](https://console.neon.tech) and open the project (this wakes it), then run `npx prisma migrate deploy` again within a minute or two.
- [ ] **1.5** Commit (do **not** commit `backend/.env` — it contains secrets):
  ```bash
  git add "New LF restaurant/backend/.env.example" "New LF restaurant/TASKS.md"
  git commit -m "feat: use own Neon database and add task list"
  ```

---

## Task 2: (Later) Refine UI and content
**Goal:** Improve UI and tailor content for top hotels in Ethiopia.

- [ ] 2.1 Define UI refinements (copy, branding, layout).
- [ ] 2.2 Implement and test.
- [ ] 2.3 Commit.

---

## Task 3+: (Later) Other refinements
- Further backend/frontend fixes, features, or content as needed.

---

*After each task: run the app, test, then commit with a clear message.*
