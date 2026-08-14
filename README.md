# Enterprise Procurement System

A full-stack Enterprise Procurement Management System built using **Spring Boot**, **MySQL**, **Spring Security (JWT)**, and **REST APIs**. The system streamlines the complete procurement lifecycle from purchase request creation to final approval with role-based access control, audit logging, reporting, and automated email notifications.

---

## Features

### Authentication & Security
- JWT-based Authentication
- Role-Based Authorization
- Secure REST APIs using Spring Security
- Protected Endpoints with Method-Level Security

### Procurement Workflow
- Create Purchase Requests
- Submit Purchase Requests
- Manager Approval
- Finance Approval
- Procurement Approval
- Supplier Selection

### Dashboard & Reports
- Dashboard Summary
- Department Procurement Reports
- Supplier Performance Reports
- Monthly Procurement Reports
- Procurement Spend Analysis
- PDF Report Export
- Excel Report Export

### Enterprise Features
- Global Exception Handling
- Audit Logging
- Swagger / OpenAPI Documentation
- Email Notifications
- Validation
- RESTful API Architecture

---

# Technology Stack

## Backend

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA (Hibernate)
- Maven
- MySQL
- JavaMail Sender
- Swagger / OpenAPI

## Frontend (In Progress)

- React
- TypeScript
- Vite
- Material UI
- Axios

---

# Project Architecture

```
React Frontend
        │
        ▼
Spring Boot REST API
        │
        ▼
Spring Security (JWT)
        │
        ▼
Business Services
        │
        ▼
Spring Data JPA
        │
        ▼
MySQL Database
```

---

# Procurement Workflow

```
Employee

    │

Create Purchase Request

    │

DRAFT

    │

Submit Request

    ▼

PENDING_MANAGER_APPROVAL

    │

Manager Approval

    ▼

PENDING_FINANCE_APPROVAL

    │

Finance Approval

    ▼

PENDING_PROCUREMENT_APPROVAL

    │

Procurement Approval

    ▼

APPROVED
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/<YOUR_USERNAME>/T5-enterprise-procurement-system.git
```

---

## 2. Open Project

Open the project using:

- Eclipse
- IntelliJ IDEA

---

## 3. Create Database

```sql
CREATE DATABASE enterprise_procurement;
```

Import the provided SQL schema.

---

## 4. Configure Database

Update:

```
src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/enterprise_procurement
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

---

## 5. Configure Email

```properties
spring.mail.username=YOUR_EMAIL@gmail.com
spring.mail.password=YOUR_APP_PASSWORD
```

---

## 6. Run Application

Using Maven Wrapper:

```bash
./mvnw spring-boot:run
```

or from Eclipse.

---

# Swagger

After running the application:

```
http://localhost:8080/swagger-ui/index.html
```

---

# API Modules

## Authentication

- Register User
- Login User

## Dashboard

- Dashboard Summary

## Purchase Requests

- Create Purchase Request
- Submit Purchase Request
- Update Purchase Request
- Delete Purchase Request
- Manager Approval
- Finance Approval
- Procurement Approval

## Reports

- PDF Export
- Excel Export
- Spend Analysis
- Supplier Performance
- Department Report

## Audit Logs

- View Audit Logs

---

# Email Notifications

The system automatically sends emails for:

- User Registration
- Purchase Request Submission
- Manager Approval
- Finance Approval
- Final Procurement Approval

---

# Security

- JWT Authentication
- Role-Based Authorization
- Protected REST APIs
- Method-Level Security
- Password Encryption

---

# Current Project Status

| Module | Status |
|----------|--------|
| Authentication | ✅ |
| Authorization | ✅ |
| Purchase Workflow | ✅ |
| Reports | ✅ |
| Dashboard | ✅ |
| Swagger | ✅ |
| Audit Logging | ✅ |
| Exception Handling | ✅ |
| Email Notifications | ✅ |
| Frontend | 🚧 In Progress |
| Docker Deployment | 🚧 Planned |

---

# Future Enhancements

- React Frontend
- Docker Deployment
- CI/CD Pipeline
- Cloud Deployment
- Notification Dashboard
- Analytics Dashboard

---

# Author

**Goutham Raj Rajagopal**

Thiagarajar College of Engineering

Development of Smart Procurement & Purchase Order Management System – Infosys Internship Project
