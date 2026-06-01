Berikut adalah spesifikasi teknis yang sangat detail, terstruktur, dan terfragmentasi dengan jelas agar bisa langsung dipahami dan dieksekusi oleh AI Agent (seperti Cursor, Claude Engineer, Devin, atau GPT Engineer) tanpa ambiguitas.

Anda dapat langsung menyalin teks di bawah ini dan memasukkannya ke dalam AI Agent Anda.

---

# SYSTEM SPECIFICATION & EXECUTION PROMPT FOR AI AGENT

## 1. System Overview & Context

You are an expert full-stack developer. Your task is to build a **Graduation Announcement & SKL Download System** designed to handle a sudden traffic spike of up to 500 concurrent students safely, fast, and without performance degradation.

### Tech Stack Blueprint:

* **Backend:** Laravel (API-only mode or integrated architecture).
* **Frontend:** React.js via Vite, styled with Tailwind CSS and Shadcn UI components.
* **Database:** PostgreSQL.
* **UI Constraint:** High consistency, clean minimalist aesthetic. Use **pure static pages** for all operations (Create, Edit, Import). **DO NOT use modals/pop-ups** for forms or data management to ensure state stability and clean navigation.

---

## 2. Database Schema (PostgreSQL Specification)

Generate and execute the migration according to these exact parameters.
*Note: Do not use any table prefixes.*

```sql
-- Table: admins
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    nisn VARCHAR(20) UNIQUE NOT NULL,
    nama VARCHAR(150) NOT NULL,
    ttl VARCHAR(100) NOT NULL,
    status_lulus BOOLEAN DEFAULT TRUE,
    link_skl TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRITICAL PERFORMANCE INDEX
-- This index is mandatory to guarantee fast lookup times under concurrent student requests.
CREATE INDEX idx_students_nisn ON students(nisn);

```

---

## 3. Backend API Architecture (Laravel)

### API Routes (`routes/api.php`)

#### Public Routes (High Performance):

* `POST /api/v1/public/search` -> Handles NISN lookup. Returns student details if matched, or 404.

#### Protected Routes (Admin Only - Guarded by Sanctum or JWT):

* `POST /api/v1/auth/login` -> Single admin authentication.
* `POST /api/v1/auth/logout` -> Destroys session/token.
* `GET /api/v1/admin/students` -> Fetch all students (Paginated, default 50 per page).
* `POST /api/v1/admin/students` -> Create single student.
* `GET /api/v1/admin/students/{id}` -> Show single student details.
* `PUT /api/v1/admin/students/{id}` -> Update single student.
* `DELETE /api/v1/admin/students/{id}` -> Delete student.
* `POST /api/v1/admin/students/import` -> Handles bulk import via `.csv` or `.xlsx`.

### Business Logic Requirements:

1. **Import Implementation:** The import system must parse `nisn`, `nama`, `ttl`, and `link_skl`. If a NISN already exists, it must upsert (update) the row instead of throwing a duplicate error.
2. **Search Implementation:** The search query must be exact and utilize the PostgreSQL index efficiently: `Student::where('nisn', $request->nisn)->firstOrFail();`.

---

## 4. Frontend Architecture & UI Components (React + Vite + Tailwind + Shadcn)

Structure the application using standard routing (`react-router-dom`). Ensure all admin actions utilize separate static routes rather than overlay modals.

### Route Mapping & Pages Matrix:

#### Public Group:

1. `/` (Home/Search Page):
* Minimalist layout. Centered search card using Shadcn `<Card>`, `<Input>`, and `<Button>`.
* Single input field for NISN.


2. `/result/{nisn}` (Result Page):
* Displays student status if matched.
* Design: Large alert/banner using Shadcn components showing status: "LULUS" (Green theme) or "TIDAK LULUS" (Red theme).
* Display fields: NISN, Nama, Tempat Tanggal Lahir (TTL).
* A prominent **Download SKL** button that opens `link_skl` in a new tab if status is LULUS.



#### Admin Group (Protected):

1. `/admin/login`:
* Simple login card centered on screen. Fields: username, password.


2. `/admin/dashboard` (Data Overview):
* Displays a clean Shadcn `<Table>` containing all students with pagination.
* Top action bar contains: "Tambah Siswa" button (links to `/admin/students/create`) and "Import Data" button (links to `/admin/students/import`).
* Action columns for each row: Edit (links to `/admin/students/edit/:id`) and Delete (triggers standard confirmation).


3. `/admin/students/create` (Static Page):
* Full-page form to manually insert data.


4. `/admin/students/edit/:id` (Static Page):
* Full-page form pre-filled with student data for modification.


5. `/admin/students/import` (Static Page):
* Simple drag-and-drop or file selection area for CSV/Excel upload. Includes a download link for a sample template file.



---

## 5. Step-by-Step Execution Plan for AI Agent

Follow these exact steps sequentially:

* **Step 1:** Initialize the PostgreSQL database using the schema provided. Do not use table prefixes. Ensure the B-Tree index on `students(nisn)` is explicitly compiled.
* **Step 2:** Scaffold the Laravel application. Silahkan cek dependency (seperti versi PHP minimal 8.2, versi Node.js, Composer, dan package pihak ketiga) agar versi Laravel-nya cocok dan tidak terjadi konflik. Create migrations, models (`Admin`, `Student`), and setup the Authentication system for a single user record. Seed the database with 1 default admin account.
* **Step 3:** Implement the `StudentController` with the import engine. Ensure input validation checks for required fields (`nisn`, `nama`, `ttl`, `link_skl`).
* **Step 4:** Build the React application with Vite, Tailwind CSS, and Shadcn UI.
* **Step 5:** Implement Frontend routing via `react-router-dom` mapping out the static pages. Make absolutely sure no modals are used for CRUD or upload interfaces.
* **Step 6:** Connect Frontend API services to the Laravel Backend. Test data reactivity and end-to-end integration.

Begin generating the codebase now, starting with the database migrations and backend models.