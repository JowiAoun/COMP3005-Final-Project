import psycopg

# Database environment variables
DB_HOST = 'localhost'
DB_NAME = 'finalproject'
DB_USER = 'postgres'
DB_PASS = 'Wy5w0UY5l55G1Pf'
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
