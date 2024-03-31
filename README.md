Install & Run:
1. Change directory into the app
2. Execute `docker compose up --build` (Docker daemon must be running)
3. To test adding data into a table, go to `http://localhost:8000/testDbInsert?name=John&hobby=Biking&age=32`
4. To see the data in that test table, go to `http://localhost:8000/testDbGetPeople`
5. To test clearing the table, go to `http://localhost:8000/testDbClear`

Install & Run next.js development server:
1. `cd client`
2. `npm install` to install dependencies
3. `npm run dev` to run the development server
4. `http://localhost:3000/member` to see member's view

Useful commands:
- `docker compose down --volume` clears all volumes
