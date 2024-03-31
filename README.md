To install:
1. Change directory into the app
2. Execute `docker compose up --build` (Docker daemon must be running)
3. Go to `localhost:8000` (Database must be running)
4. To test adding data into a table, go to `http://localhost:8000/testDbInsert?name=John&hobby=Biking&age=32`
5. To see the data in that test table, go to `http://localhost:8000/testDbGetPeople`
6. To test clearing the table, go to `http://localhost:8000/testDbClear`

Useful commands:
- `docker compose down --volume` clears all volumes
