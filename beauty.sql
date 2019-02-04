DROP DATABASE IF EXISTS beautycrate;
CREATE DATABASE beautycrate;

USE beautycrate;

CREATE TABLE products (
      id INT NOT NULL AUTO_INCREMENT,
      product VARCHAR(100) NOT NULL,
      department VARCHAR(45) NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      stock INT NOT NULL,
      PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product, department, price, stock)
VALUES ("maskara", "beauty", 8.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("eyeliner", "beauty", 5.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("lipstick", "beauty", 6.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("blush", "beauty", 5.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("clippers", "general", 12.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("qtips", "general", 1.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("towel", "general", 2.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("hairspray", "hair", 3.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("comb", "hair", 1.99, 100);

INSERT INTO products (product, department, price, stock)
VALUES ("brush", "hair", 8.99, 100);