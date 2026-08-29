# Enterprise Procurement System - Database Setup

## Prerequisites

- MySQL 8.0+
- MySQL Workbench

---

## Step 1: Create Database

```sql
CREATE DATABASE enterprise_procurement;
```

---

## Step 2: Import SQL File

Open MySQL Workbench.

Go to:

Server
→ Data Import

Select:

Import from Self-Contained File

Choose:

enterprise_procurement.sql

Select Target Schema:

enterprise_procurement

Click:

Start Import

---

## Step 3: Configure Application

Update `src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/enterprise_procurement
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## Step 4: Run Application

Run:

```
EnterpriseProcurementApplication.java
```

Tomcat should start on port **8080**.

---

## Test User

Email:

```
auth.test.2026@test.com
```

Use the shared team password for this account (or create a new test user if needed).

---

## Project Workflow

Login

↓

Create Purchase Request

↓

Add Purchase Request Items

↓

Manager Approval

↓

Finance Approval

↓

Procurement Approval

↓

Supplier Selection

↓

Generate Purchase Order