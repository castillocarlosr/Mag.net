DROP TABLE IF EXISTS magnets;

CREATE TABLE IF NOT EXISTS magnet_types (
id SERIAL PRIMARY KEY,
type VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR(255),
email VARCHAR(255)
);

CREATE TABLE magnets (
id SERIAL PRIMARY KEY,
content VARCHAR(255),
x INTEGER,
y INTEGER,
type_id INTEGER NOT NULL REFERENCES magnet_types(id)
);


INSERT INTO magnets (content, x, y, type_id) VALUES ('a', 150, 100, 1);
INSERT INTO magnets (content, x, y, type_id) VALUES ('b', 140, 100, 1);
INSERT INTO magnets (content, x, y, type_id) VALUES ('c', 160, 100, 1);
INSERT INTO magnets (content, x, y, type_id) VALUES ('https://i.imgflip.com/1ur9b0.jpg', 130, 100, 2);
INSERT INTO magnets (content, x, y, type_id) VALUES ('cow', 160, 100, 3);

