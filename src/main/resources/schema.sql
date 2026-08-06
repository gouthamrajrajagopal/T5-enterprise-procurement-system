/* ============================================================
   ENTERPRISE PROCUREMENT SYSTEM
   Assignment 3 - Master Data Management
   ============================================================ */

/* =========================
   ROLES
   ========================= */
CREATE TABLE IF NOT EXISTS roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/* =========================
   DEPARTMENTS
   ========================= */
CREATE TABLE IF NOT EXISTS departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_code VARCHAR(20) NOT NULL UNIQUE,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

/* =========================
   USERS
   ========================= */
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    role_id INT NOT NULL,
    dept_id INT NOT NULL,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),

    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

/* =========================
   SUPPLIERS
   ========================= */
CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,

    supplier_code VARCHAR(20) NOT NULL UNIQUE,

    supplier_name VARCHAR(100) NOT NULL,

    contact_person VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    phone VARCHAR(20),

    address TEXT,

    gst_number VARCHAR(30) UNIQUE,

    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

/* =========================
   PROCUREMENT CATEGORIES
   ========================= */
CREATE TABLE IF NOT EXISTS categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,

    category_code VARCHAR(20) NOT NULL UNIQUE,

    category_name VARCHAR(100) NOT NULL UNIQUE,

    description VARCHAR(255),

    routing_department_id INT,

    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (routing_department_id)
        REFERENCES departments(dept_id)
);

/* =========================
   APPROVAL HIERARCHY
   ========================= */
CREATE TABLE IF NOT EXISTS approval_hierarchy (

    hierarchy_id INT PRIMARY KEY AUTO_INCREMENT,

    dept_id INT NOT NULL,

    approval_level INT NOT NULL,

    approver_role_id INT NOT NULL,

    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (dept_id, approval_level),

    FOREIGN KEY (dept_id)
        REFERENCES departments(dept_id),

    FOREIGN KEY (approver_role_id)
        REFERENCES roles(role_id)
);

/* =========================
   APPROVAL RULES
   ========================= */
CREATE TABLE IF NOT EXISTS approval_rules (

    rule_id INT PRIMARY KEY AUTO_INCREMENT,

    minimum_amount DECIMAL(12,2) NOT NULL,

    maximum_amount DECIMAL(12,2) NOT NULL,

    approval_level INT NOT NULL,

    active BOOLEAN DEFAULT TRUE
);

/* =========================
   SUPPLIER COMPLIANCE
   ========================= */
CREATE TABLE IF NOT EXISTS supplier_compliance (

    compliance_id INT PRIMARY KEY AUTO_INCREMENT,

    supplier_id INT NOT NULL,

    gst_verified BOOLEAN DEFAULT FALSE,

    pan_verified BOOLEAN DEFAULT FALSE,

    iso_certified BOOLEAN DEFAULT FALSE,

    license_expiry DATE,

    compliance_status ENUM(
        'COMPLIANT',
        'NON_COMPLIANT',
        'PENDING'
    ) DEFAULT 'PENDING',

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
);

/* =========================
   SUPPLIER PERFORMANCE
   ========================= */
CREATE TABLE IF NOT EXISTS supplier_performance (

    performance_id INT PRIMARY KEY AUTO_INCREMENT,

    supplier_id INT NOT NULL,

    quality_score DECIMAL(5,2),

    delivery_score DECIMAL(5,2),

    cost_score DECIMAL(5,2),

    overall_rating DECIMAL(5,2),

    review_date DATE,

    FOREIGN KEY (supplier_id)
        REFERENCES suppliers(supplier_id)
);

/* =========================
   PURCHASE REQUESTS
   ========================= */

CREATE TABLE IF NOT EXISTS purchase_requests (

                                                 request_id INT PRIMARY KEY AUTO_INCREMENT,

                                                 request_number VARCHAR(30) NOT NULL UNIQUE,

    user_id INT NOT NULL,

    department_id INT NOT NULL,

    purpose VARCHAR(255),

    total_quantity INT DEFAULT 0,

    total_amount DECIMAL(12,2) DEFAULT 0.00,

    status ENUM(
                   'DRAFT',
                   'PENDING',
                   'PENDING_MANAGER_APPROVAL',
                   'PENDING_FINANCE_APPROVAL',
                   'PENDING_OWNER_APPROVAL',
                   'APPROVED',
                   'REJECTED',
                   'CANCELLED',
                   'VENDOR_SELECTION_PENDING',
                   'VENDOR_SELECTED',
                   'PO_PENDING',
                   'PO_GENERATED',
                   'GOODS_RECEIPT_PENDING',
                   'COMPLETED'
               ) DEFAULT 'PENDING',

    current_approval_level INT DEFAULT 0,

    selected_supplier_id INT NULL,

    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_purchase_request_user
    FOREIGN KEY (user_id)
    REFERENCES users(user_id),

    CONSTRAINT fk_purchase_request_department
    FOREIGN KEY (department_id)
    REFERENCES departments(dept_id),

    CONSTRAINT fk_purchase_request_supplier
    FOREIGN KEY (selected_supplier_id)
    REFERENCES suppliers(supplier_id)
    );

/* =========================
   PURCHASE REQUEST ITEMS
   ========================= */

CREATE TABLE IF NOT EXISTS purchase_request_items (

                                                      item_id INT PRIMARY KEY AUTO_INCREMENT,

                                                      request_id INT NOT NULL,

                                                      category_id INT NOT NULL,

                                                      item_name VARCHAR(100) NOT NULL,

    item_description VARCHAR(255),

    quantity INT NOT NULL,

    estimated_price DECIMAL(12,2) DEFAULT 0.00,

    total_price DECIMAL(12,2) DEFAULT 0.00,

    CONSTRAINT fk_pr_item_request
    FOREIGN KEY (request_id)
    REFERENCES purchase_requests(request_id),

    CONSTRAINT fk_pr_item_category
    FOREIGN KEY (category_id)
    REFERENCES categories(category_id)
    );



/* =========================
   APPROVALS
   ========================= */

CREATE TABLE IF NOT EXISTS approvals (

                                         approval_id INT PRIMARY KEY AUTO_INCREMENT,

                                         request_id INT NOT NULL,

                                         approver_id INT NOT NULL,

                                         approval_level INT DEFAULT 1,

                                         approver_role VARCHAR(50),

    status ENUM(
                   'PENDING',
                   'APPROVED',
                   'REJECTED'
               ) DEFAULT 'PENDING',

    remarks VARCHAR(255),

    approval_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_approval_request
    FOREIGN KEY (request_id)
    REFERENCES purchase_requests(request_id),

    CONSTRAINT fk_approval_user
    FOREIGN KEY (approver_id)
    REFERENCES users(user_id)
    );
/* =========================
   PURCHASE ORDERS
   ========================= */

CREATE TABLE IF NOT EXISTS purchase_orders (

                                               po_id INT PRIMARY KEY AUTO_INCREMENT,

                                               po_number VARCHAR(30) NOT NULL UNIQUE,

    request_id INT NOT NULL UNIQUE,

    supplier_id INT NOT NULL,

    status VARCHAR(30) DEFAULT 'CREATED',

    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,

    order_date DATE,

    expected_delivery_date DATE,

    actual_delivery_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_po_request
    FOREIGN KEY (request_id)
    REFERENCES purchase_requests(request_id),

    CONSTRAINT fk_po_supplier
    FOREIGN KEY (supplier_id)
    REFERENCES suppliers(supplier_id)
    );
/* =========================
   PURCHASE ORDER ITEMS
   ========================= */

CREATE TABLE IF NOT EXISTS purchase_order_items (

                                                    po_item_id INT PRIMARY KEY AUTO_INCREMENT,

                                                    po_id INT NOT NULL,

                                                    item_name VARCHAR(100),

    item_description VARCHAR(255),

    quantity INT NOT NULL,

    unit_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,

    total_price DECIMAL(12,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT fk_po_item_order
    FOREIGN KEY (po_id)
    REFERENCES purchase_orders(po_id)
    );

/* =========================
   GOODS RECEIPTS
   ========================= */
CREATE TABLE IF NOT EXISTS goods_receipts (

    grn_id INT PRIMARY KEY AUTO_INCREMENT,

    po_id INT,

    received_date DATE,

    status VARCHAR(30),

    FOREIGN KEY (po_id)
        REFERENCES purchase_orders(po_id)
);

/* =========================
   INVOICES
   ========================= */
CREATE TABLE IF NOT EXISTS invoices (

    invoice_id INT PRIMARY KEY AUTO_INCREMENT,

    po_id INT,

    invoice_number VARCHAR(50),

    amount DECIMAL(10,2),

    invoice_date DATE,

    FOREIGN KEY (po_id)
        REFERENCES purchase_orders(po_id)
);
/* =========================
   DEFAULT ROLES
   ========================= */

INSERT IGNORE INTO roles
(role_id, role_name, description)
VALUES
(1, 'EMPLOYEE', 'Creates purchase requisitions'),
(2, 'MANAGER', 'Approves or rejects requests'),
(3, 'FINANCE', 'Handles budget, invoices and payments'),
(4, 'ADMIN', 'Manages master data and users'),
(5, 'OWNER', 'Approves high-value purchase requests'),
(6, 'VENDOR', 'Receives purchase orders and updates delivery'),
(9, 'PROCUREMENT_OFFICER', 'Handles supplier selection and procurement activities');