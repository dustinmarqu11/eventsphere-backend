# EventSphere — Online Entertainment Event Reservation and Management System (Backend)

RESTful backend prototype built for **ITEC 116 — Systems Integration and Architecture 2**.

## Technology Stack
- **Framework:** NestJS (TypeScript)
- **ORM:** TypeORM
- **Database:** MySQL
- **Authentication:** JWT & Bcrypt

## How to Run Locally
1. Clone the repository and run `npm install`.
2. Create a `.env` file in the root directory (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`).
3. Start MySQL in XAMPP and create the `eventsphere_db` database.
4. Start the server: `npm run start:dev`.