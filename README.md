# Development of Smart Procurement and Purchase Order Management System

## ProcureFlow

ProcureFlow is a full-stack procurement platform designed to digitize
and streamline the procurement lifecycle, from purchase request creation
and multi-level approvals to supplier selection and purchase-order
generation.

------------------------------------------------------------------------

## Overview

The system provides a centralized platform for managing enterprise
procurement activities with:

-   Role-based access control
-   Multi-level approval workflows
-   Supplier management and compliance
-   Purchase-order generation
-   Procurement reporting
-   Audit logging
-   Authentication and password recovery

------------------------------------------------------------------------

## Procurement Workflow

``` text
Employee Request
       |
       v
Manager Approval
       |
       v
Finance Approval
       |
       v
Procurement Approval
       |
       v
Supplier Selection
       |
       v
Purchase Order
```

------------------------------------------------------------------------

## Technology Stack

Layer             Technologies
  ----------------- ---------------------------------------
Frontend          React, JavaScript, Vite, React Router
Backend           Java, Spring Boot, Spring Security
Persistence       Spring Data JPA, Hibernate
Database          MySQL
Build Tools       Maven, npm
Version Control   Git, GitHub

------------------------------------------------------------------------

## System Architecture

``` text
+----------------------+
|    React Frontend    |
| Pages / Components   |
| Routing / UI         |
+----------+-----------+
           |
           | REST API
           v
+----------------------+
|   Spring Boot API    |
| Controllers          |
| Services             |
| DTOs                 |
| Security             |
| Repositories         |
+----------+-----------+
           |
           | JPA / Hibernate
           v
+----------------------+
|        MySQL         |
| Users                |
| Requests             |
| Approvals            |
| Suppliers            |
| Purchase Orders      |
| Audit Logs           |
+----------------------+
```

The backend follows a layered architecture that separates API handling,
business logic, and database access.

------------------------------------------------------------------------

## User Roles

  -----------------------------------------------------------------------
Role                                Responsibilities
  ----------------------------------- -----------------------------------
Employee                            Create and track purchase requests

Manager                             Review and approve requests

Finance                             Perform financial approval

Procurement                         Approve requests, select suppliers,
and generate purchase orders

Administrator                       Manage administrative functions,
reports, and audit monitoring
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Core Modules

### Authentication

-   Login and registration
-   Role-based access
-   Forgot password
-   Password reset
-   BCrypt password hashing

### Procurement

-   Purchase requests
-   Multi-level approvals
-   Supplier management
-   Supplier compliance
-   Supplier selection
-   Purchase orders

### Administration

-   Dashboard
-   Reports
-   Audit logs
-   Administrative configuration

------------------------------------------------------------------------

## Security

The application implements:

-   Role-based authorization
-   Protected REST APIs
-   BCrypt password encoding
-   Secure password-reset tokens
-   30-minute reset-token expiration
-   Single-use password-reset tokens
-   Administrator-only audit-log access

------------------------------------------------------------------------

## Project Structure

``` text
T5-enterprise-procurement-v1/
|
+-- frontend/        React application
+-- src/             Spring Boot backend
+-- database/        MySQL schema and setup
+-- pom.xml          Maven configuration
+-- README.md        Project documentation
```

Database resources:

``` text
database/
+-- enterprise_procurement.sql
+-- README_DATABASE.md
```

------------------------------------------------------------------------

## Prerequisites

Install the following before running the project:

-   Java JDK
-   Maven
-   Node.js and npm
-   MySQL
-   Git

------------------------------------------------------------------------

## Setup

### 1. Clone the Repository

``` bash
git clone <repository-url>
cd T5-enterprise-procurement-v1
```

### 2. Configure the Database

Import:

``` text
database/enterprise_procurement.sql
```

Refer to:

``` text
database/README_DATABASE.md
```

for project-specific database instructions.

Configure the local database connection in:

``` text
src/main/resources/application.properties
```

Do not commit real passwords, API keys, or other sensitive credentials.

### 3. Start the Backend

From the project root:

``` bash
mvn spring-boot:run
```

Alternatively, run the Spring Boot application from an IDE.

### 4. Start the Frontend

``` bash
cd frontend
npm install
npm run dev
```

### 5. Build and Validate

Frontend:

``` bash
npm run build
npm run lint
```

Backend:

``` bash
mvn clean package
```

------------------------------------------------------------------------

## Project Status

### Final Internship Presentation Version

The major authentication, procurement, approval, supplier,
purchase-order, reporting, audit, and security modules have been
implemented and tested.

The completed project is maintained in the `final-project` Git branch.

------------------------------------------------------------------------

## Future Enhancements

The following enhancements can be considered for future versions:

-   Email notifications for approval and procurement status updates
-   Docker-based deployment
-   CI/CD pipeline integration
-   Cloud deployment
-   Advanced procurement analytics and dashboards
-   Automated supplier evaluation and scoring
-   Enhanced notification and alert management
-   Integration with enterprise ERP and finance systems

------------------------------------------------------------------------

## Project Information

**Project Title:** Development of Smart Procurement and Purchase Order
Management System\
**Application:** ProcureFlow\
**Domain:** Enterprise Procurement Management\
**Architecture:** Full-Stack Layered Architecture\
**Frontend:** React + Vite\
**Backend:** Java + Spring Boot\
**Database:** MySQL\
**Version Control:** Git + GitHub

Developed as an internship project.
