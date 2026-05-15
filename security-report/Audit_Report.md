AuraStream: Application Security Audit & Hardening
Target: MERN Stack Media Platform
Researcher: Shreyash Londhe

Executive Summary
This project involved a manual security audit of the AuraStream platform to identify and remediate critical web vulnerabilities. I focused on the OWASP Top 10 categories of Broken Authentication and Broken Access Control.

Vulnerability Findings
1. NoSQL Injection (Bypass Authentication)
Finding: The login endpoint accepted raw JSON objects, allowing for query operator injection ($gt, $ne).

Impact: Critical. Unauthorized access to any user account without valid credentials.

Evidence: ![NoSQL Injection Success](../poc-evidence/NoSQL_Injection_Success.PNG)

Remediation: Enforced strict input type checking and restored password hashing verification layers.

2. IDOR: Insecure Direct Object Reference
Finding: The profile deletion endpoint lacked a server-side ownership check.

Impact: High. Any authenticated user could delete profiles belonging to other users.

Evidence: ![IDOR](../poc-evidence/IDOR_Attack_Success.PNG)

Remediation: Implemented an authorization check verifying profile.userId === req.user._id before executing database deletions.