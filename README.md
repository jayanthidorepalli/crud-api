# CRUD API with AWS & Jenkins CI/CD

## Project Overview

This project is a production-ready RESTful CRUD API built using Node.js and Express.js. The application is deployed on AWS EC2, uses Amazon RDS PostgreSQL as its database, is managed by PM2, served through Nginx, and automatically deployed using a Jenkins CI/CD pipeline.

---

# Architecture

```
GitHub Repository
        │
   Git Push
        │
        ▼
 GitHub Webhook
        │
        ▼
 Jenkins Pipeline
        │
 ┌──────┴─────────┐
 │                │
Checkout      npm install
 │                │
 └──────┬─────────┘
        ▼
Restart PM2
        │
        ▼
Health Check
        │
        ▼
Nginx Reverse Proxy
        │
        ▼
CRUD API
        │
        ▼
Amazon RDS PostgreSQL
```

---

# Technologies Used

## Cloud

- AWS EC2
- Amazon RDS PostgreSQL
- IAM
- Security Groups

## Backend

- Node.js
- Express.js
- PostgreSQL

## DevOps

- Jenkins
- GitHub
- GitHub Webhooks
- PM2
- Nginx
- Linux

---

# Infrastructure

## EC2

- Ubuntu 24.04 LTS
- Jenkins
- Node.js
- PM2
- Git
- Nginx

Public IP

```
16.113.35.228
```

---

# Database

Amazon RDS PostgreSQL

- Dedicated database for CRUD API
- Hosted on AWS RDS
- Securely connected from EC2

---

# Features

- Create records
- Read records
- Update records
- Delete records
- RESTful API
- PostgreSQL database integration
- Automatic deployment
- Health monitoring

---

# CI/CD Pipeline

The Jenkins pipeline performs the following tasks automatically after every push to GitHub.

## Stage 1

Checkout source code

```groovy
checkout scm
```

---

## Stage 2

Install Dependencies

```bash
npm install
```

---

## Stage 3

Restart PM2

```bash
pm2 restart crud-api
```

---

## Stage 4

Health Check

```bash
curl http://localhost/health
```

Deployment is considered successful only if the health endpoint returns a successful response.

---

# Rollback Strategy

If deployment or health check fails:

- Restore previous Git commit
- Install dependencies
- Restart PM2

This ensures the application remains available with the last working version.

---

# Jenkins

Jenkins URL

```
http://16.113.35.228:9090
```

Pipeline Type

- Pipeline Script from SCM

Trigger

- GitHub Webhook

Deployment

- Automatic

---

# GitHub Webhook

Every push to the GitHub repository automatically triggers Jenkins.

The pipeline:

- Pulls latest source code
- Builds the application
- Deploys the application
- Restarts PM2
- Executes health check

---

# PM2 Commands

Start

```bash
pm2 start server.js --name crud-api
```

Restart

```bash
pm2 restart crud-api
```

Status

```bash
pm2 list
```

Logs

```bash
pm2 logs crud-api
```

---

# Nginx

Nginx is configured as a reverse proxy for the CRUD API.

Responsibilities:

- Reverse proxy
- HTTP request routing
- Production traffic handling

---

# Security

## Jenkins

- Admin user
- Viewer user

## AWS IAM

Reviewer IAM user with read-only access for:

- EC2
- RDS
- CloudWatch

---

# Project Structure

```
crud-api
│
├── controllers/
├── routes/
├── models/
├── config/
├── server.js
├── package.json
├── Jenkinsfile
└── README.md
```

---

# Deployment Workflow

Developer

↓

Git Push

↓

GitHub

↓

Webhook

↓

Jenkins Pipeline

↓

Checkout Code

↓

Install Dependencies

↓

Restart PM2

↓

Health Check

↓

Application Live

---

# Health Check

Endpoint

```
http://localhost/health
```

Expected Response

```json
{
  "status": "UP",
  "message": "CRUD API is running"
}
```

---

# Screenshots

Include:

- AWS EC2
- Amazon RDS
- Jenkins Dashboard
- CRUD Jenkins Pipeline
- Successful Build
- PM2 Status
- GitHub Repository
- GitHub Webhook
- API Response

---

# Future Enhancements

- Docker support
- Kubernetes deployment
- Terraform Infrastructure as Code
- SonarQube integration
- Automated testing
- Monitoring with Prometheus & Grafana

---

# Author

**Jayanthi Dorepalli**

AWS Cloud & DevOps Engineer

GitHub:
https://github.com/jayanthidorepalli

LinkedIn:
https://linkedin.com/in/jayanthi-dorepalli-475400226

---

# Project Status

✅ Successfully Completed

- AWS Infrastructure Provisioned
- PostgreSQL Database Connected
- CRUD API Deployed
- Jenkins CI/CD Pipeline Configured
- GitHub Webhook Enabled
- Automatic Deployment Working
- Health Check Implemented
- Rollback Strategy Configured
- PM2 Process Management Enabled
