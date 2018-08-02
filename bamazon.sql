DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("toothbrush", "General", 3.50, 25), ("tooth paste", "General", 5.35, 15), ("deoderent", "General", 8.25, 15), ("hair brush", "General", 4.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("football", "Sports", 15.50, 10), ("baseball", "Sports", 6.50, 15), ("basketball", "Sports", 16.50, 5), ("soccer ball", "Sports", 16.25, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Smokey the Bear Sweatshirt", "Clothing", 21.50, 8), ("Goonies V-neck Muscle Shirt", "Clothing", 17.25, 6), ("Purple People Eater Tank Top", "Clothing", 14.75, 7), ("Blink 182 Track Suit", "Clothing", 60.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NyQuil", "Health", 8.75, 10), ("Ricola", "Health", 6.75, 5), ("BreathRight", "Health", 4.75, 5), ("Advil", "Health", 8.85, 10);