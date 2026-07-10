CREATE TABLE IF NOT EXISTS roles(
 role_id INT PRIMARY KEY AUTO_INCREMENT,
 role_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS departments(
 dept_id INT PRIMARY KEY AUTO_INCREMENT,
 dept_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS users(
 user_id INT PRIMARY KEY AUTO_INCREMENT,
 role_id INT,
 dept_id INT,
 name VARCHAR(100),
 email VARCHAR(100) UNIQUE,
 FOREIGN KEY(role_id) REFERENCES roles(role_id),
 FOREIGN KEY(dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE IF NOT EXISTS suppliers(
 supplier_id INT PRIMARY KEY AUTO_INCREMENT,
 supplier_name VARCHAR(100),
 contact VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS categories(
 category_id INT PRIMARY KEY AUTO_INCREMENT,
 category_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS purchase_requests(
 request_id INT PRIMARY KEY AUTO_INCREMENT,
 user_id INT,
 status VARCHAR(30),
 created_date DATE,
 FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS purchase_request_items(
 item_id INT PRIMARY KEY AUTO_INCREMENT,
 request_id INT,
 category_id INT,
 quantity INT,
 FOREIGN KEY(request_id) REFERENCES purchase_requests(request_id),
 FOREIGN KEY(category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS approvals(
 approval_id INT PRIMARY KEY AUTO_INCREMENT,
 request_id INT,
 approver_id INT,
 status VARCHAR(30),
 FOREIGN KEY(request_id) REFERENCES purchase_requests(request_id),
 FOREIGN KEY(approver_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS purchase_orders(
 po_id INT PRIMARY KEY AUTO_INCREMENT,
 request_id INT UNIQUE,
 supplier_id INT,
 order_date DATE,
 FOREIGN KEY(request_id) REFERENCES purchase_requests(request_id),
 FOREIGN KEY(supplier_id) REFERENCES suppliers(supplier_id)
);

CREATE TABLE IF NOT EXISTS purchase_order_items(
 po_item_id INT PRIMARY KEY AUTO_INCREMENT,
 po_id INT,
 item_name VARCHAR(100),
 quantity INT,
 FOREIGN KEY(po_id) REFERENCES purchase_orders(po_id)
);

CREATE TABLE IF NOT EXISTS goods_receipts(
    grn_id INT PRIMARY KEY AUTO_INCREMENT,
    po_id INT,
    received_date DATE,
    status VARCHAR(30),
    FOREIGN KEY(po_id) REFERENCES purchase_orders(po_id)
);

CREATE TABLE IF NOT EXISTS invoices(
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    po_id INT,
    invoice_number VARCHAR(50),
    amount DECIMAL(10,2),
    invoice_date DATE,
    FOREIGN KEY(po_id) REFERENCES purchase_orders(po_id)
);