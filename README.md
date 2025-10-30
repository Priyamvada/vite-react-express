# vite-react-express
An app to run a node server with express and a frontent on react typescript using Vite

1. Client setup
2. Backend setup
3. CORS setup

## Server Setup
1. server.js configs
2. DB setup -- currently using sqlite3
3. For ORM using sequelize
4. Adding sequelize-cli as a dev dependency to make migrations and DB initialisation easier
5. Run migration npx sequelize migration:generate --name create-users-table
6. Add seed migration to seeders
7. Add utils to abstract out security measures for auth utils. This can also go in middleware
8. Add .env and add `JWT_SECRET=secret` to it
9. Added Invoices table with foreign key reference to Users table on the field created_by

## Decisions:
### SSR vs CSR
Note: Decided not to use server rendered pages and ejs

### Auth
- Using jwt token instead of express-sessions as express sessions are better suited to SSR.
- Sending JWT via cookie to maintain security via https in prod. Set the JWT as an HttpOnly cookie: After successful authentication, sign the JWT and set it in an HttpOnly cookie. This prevents client-side JavaScript from accessing the token, mitigating XSS vulnerabilities.

