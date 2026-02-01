CREATE TABLE IF NOT EXISTS messages (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    msg_name TEXT,
    content TEXT
);

INSERT INTO messages (msg_name, content) VALUES ('hello there','general kenobi');