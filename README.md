AuraStream: Application Security Audit & Hardening
Target: MERN Stack Media Platform

Researcher: Shreyash Londhe

Executive Summary
This project involved a manual security audit of the AuraStream platform to identify and remediate critical web vulnerabilities. The assessment focused on the OWASP Top 10 categories, specifically targeting Broken Authentication and Broken Access Control. By combining reconnaissance with manual exploitation, I successfully bypassed security controls and subsequently implemented hardened code remediations.

Phase 1: Reconnaissance & Service Discovery
Used Nmap to map the attack surface and identify active services on the target host.

Finding: Identified a non-standard service on Port 5173 (Vite Frontend) and an Express.js server on Port 3000.

Security Observation: Service fingerprinting revealed exposed HTTP methods including POST and DELETE on the frontend proxy, indicating a potential for unauthorized resource manipulation.

Evidence: ![Network Discovery](/poc-evidence/Network_Discovery_Frontend.PNG)
![Network Discovery](/poc-evidence/Network_Discovery_Backend.PNG)

Phase 2: Vulnerability Findings
1. NoSQL Injection (Bypass Authentication)
Finding: The login endpoint failed to sanitize input, allowing raw JSON objects to manipulate the MongoDB query logic.

Exploit: Injected the $gt (greater than) operator into the email field to return the first user in the database without requiring a valid password.

Impact: Critical. Complete authentication bypass allowing access to any user account.

Evidence: ![NoSQL Injection Success](/poc-evidence/NoSQL_Injection_Success.PNG)

Remediation: Implemented strict input type checking to ensure login credentials are strings and restored the password hashing verification layer using Bcrypt.

Remediation Verification:

2. IDOR: Insecure Direct Object Reference
Finding: The profile deletion endpoint lacked a server-side authorization check to verify resource ownership.

Exploit: Manipulated the profileId in the URL parameter via Burp Suite to delete a profile belonging to a different user account.

Impact: High. Unauthorized data destruction and loss of data integrity.

Evidence: ![IDOR](/poc-evidence/IDOR_Attack_Success.PNG)

Remediation: Enforced a server-side check comparing the userId of the target profile with the authenticated _id from the user's JWT.

Remediation Verification:

Technical Stack & Tools
Scanning: Nmap

Testing: Burp Suite Professional, Kali Linux

Environment: Windows 11 (Host), Kali VM, MongoDB Atlas

Remediation: Node.js, Express.js, Mongoose
