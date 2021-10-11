
CREATE database nodeapi;

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    isdone BOOLEAN NOT NULL,
    date TIMESTAMP DEFAULT NOW()
);