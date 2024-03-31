import psycopg

# Database environment variables
DB_HOST = 'comp3005-final-db-1'
DB_NAME = 'db-comp3005-final-project-local'
DB_USER = 'postgres'
DB_PASS = 'postgres123'
DB_PORT = 5432

# Connect to the database
try:
    conn = psycopg.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASS,
        port=DB_PORT
    )
except psycopg.OperationalError as err:
    print(f"Unable to connect to the database:\n{err}")
