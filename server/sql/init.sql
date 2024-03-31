SET search_path = "public";

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32),
    hobby VARCHAR(32),
    age INT
);
