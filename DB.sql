-- 1. create DB
sqlite3 mySQLiteDB.db

-- 2. create tables
CREATE TABLE IF NOT EXISTS Categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Missions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  date INTEGER NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'Processing' CHECK (status IN ('Processing', 'Done')),
  emoji TEXT,
  FOREIGN KEY (category_id) REFERENCES Categories (id)
);

-- 3. insert data
INSERT INTO Categories (name) VALUES ('Work');
INSERT INTO Categories (name) VALUES ('Family');
INSERT INTO Categories (name) VALUES ('Social');
INSERT INTO Categories (name) VALUES ('Food');
INSERT INTO Categories (name) VALUES ('Education');
INSERT INTO Categories (name) VALUES ('Chores');
INSERT INTO Categories (name) VALUES ('Finance');
INSERT INTO Categories (name) VALUES ('Entertainment');
INSERT INTO Categories (name) VALUES ('Holidays');


-- 4. confirm data was inserted
select * from Categories;
-- 1|Groceries|Expense
-- 2|Rent|Expense
-- 3|Salary|Income
-- 4|Freelancing|Income

-- Expenses
-- February 2024
INSERT INTO Missions (category_id, date, description, status) VALUES (1, 1709814000, '测试', 'Processing');

-- 5. confirm again
select * from Missions;
-- 1|1|100.5|2023-01-10|Weekly groceries|Expense
-- 2|1|75.25|2023-01-17|More groceries|Expense
-- 3|2|1200.0|2023-01-01|Monthly rent|Expense
-- 4|1|45.99|2023-01-24|Snacks and drinks|Expense
-- 5|3|3000.0|2023-01-15|Monthly salary|Income
-- 6|4|500.0|2023-01-20|Freelance project|Income

-- 6. exit db
.quit