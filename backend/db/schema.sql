CREATE TABLE tasks (
  id       SERIAL PRIMARY KEY,
  label    VARCHAR(50),
  points   INT,
  is_done  BOOLEAN DEFAULT FALSE
);

CREATE TABLE rewards (
  id     SERIAL PRIMARY KEY,
  label  VARCHAR(50),
  cost   INT
);

CREATE TABLE transactions (
  id         SERIAL PRIMARY KEY,
  type       VARCHAR(10) CHECK (type IN ('earned', 'redeemed')),
  points     INT,
  task_id    INT REFERENCES tasks(id),
  created_at TIMESTAMP DEFAULT NOW()
);