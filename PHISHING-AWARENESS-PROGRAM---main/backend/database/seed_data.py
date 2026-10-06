import json
import sqlite3
from .db import get_db_connection

def seed_database():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if already seeded
    cursor.execute("SELECT COUNT(*) FROM modules")
    if cursor.fetchone()[0] > 0:
        conn.close()
        return

    # Seed Modules
    modules = [
        {
            "id": "mod-1",
            "title": "Phishing Fundamentals",
            "category": "Basics",
            "description": "Learn what phishing is, how attacks are executed, common vectors, and why cybercriminals target individuals and organizations.",
            "icon": "ShieldAlert",
            "duration": "10 mins",
            "lessons_count": 5,
            "level": "Beginner"
        },
        {
            "id": "mod-2",
            "title": "Email Inspection & Red Flags",
            "category": "Analysis",
            "description": "Master the art of identifying deceptive headers, spoofed domains, malicious attachments, and psychological triggers in emails.",
            "icon": "Mail",
            "duration": "15 mins",
            "lessons_count": 6,
            "level": "Intermediate"
        },
        {
            "id": "mod-3",
            "title": "Fake Login & Credential Harvesting",
            "category": "Simulation",
            "description": "Examine how attackers replicate legitimate login portals, detect domain anomalies, HTTPS misdirections, and fake password reset forms.",
            "icon": "KeyRound",
            "duration": "12 mins",
            "lessons_count": 4,
            "level": "Intermediate"
        },
        {
            "id": "mod-4",
            "title": "Fraudulent Websites & Typosquatting",
            "category": "Web Security",
            "description": "Detect lookalike domains, fake SSL badges, suspicious redirects, and malicious download prompts before clicking.",
            "icon": "Globe",
            "duration": "12 mins",
            "lessons_count": 5,
            "level": "Intermediate"
        },
        {
            "id": "mod-5",
            "title": "Social Engineering Tactics",
            "category": "Psychology",
            "description": "Understand psychological manipulation techniques including urgency, fear, authority impersonation, and trust exploitation.",
            "icon": "UserCheck",
            "duration": "15 mins",
            "lessons_count": 8,
            "level": "Advanced"
        },
        {
            "id": "mod-6",
            "title": "Real-Life Cyber Case Studies",
            "category": "Real-World",
            "description": "Analyze multi-million dollar real-world phishing breaches, corporate impact, victim mistakes, and key defensive lessons.",
            "icon": "FileText",
            "duration": "20 mins",
            "lessons_count": 5,
            "level": "Advanced"
        }
    ]

    for m in modules:
        cursor.execute('''
            INSERT INTO modules (id, title, category, description, icon, duration, lessons_count, level)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (m["id"], m["title"], m["category"], m["description"], m["icon"], m["duration"], m["lessons_count"], m["level"]))

    # Seed Phishing Examples (Emails & Fake Logins & Website Demos)
    phishing_examples = [
        {
            "id": "email-1",
            "type": "email",
            "title": "Urgent IT System Upgrade & Password Reset",
            "category": "Credential Harvesting",
            "sender": "support@security-update-portal-net.com",
            "sender_name": "Global IT Desk",
            "subject": "URGENT: Your Account Will Be Terminated in 2 Hours - Action Required!",
            "body": "Dear Employee,\n\nOur system detected an unusual sign-in attempt on your account from an unrecognized IP address (192.168.1.102). To secure your account and prevent immediate termination of access, you MUST verify your credentials immediately.\n\nPlease click the button below to update your password:\n[ VERIFY YOUR ACCOUNT NOW ] -> http://auth-login-pass-verify.com/login?usr=emp\n\nFailure to complete this within 2 hours will result in permanent account suspension and IT security escalation.\n\nRegards,\nIT Security Helpdesk Team\nConfidential & Proprietary",
            "domain": "security-update-portal-net.com",
            "legitimate_domain": "company.com",
            "red_flags": json.dumps([
                {
                    "id": "rf-1",
                    "text": "support@security-update-portal-net.com",
                    "label": "Suspicious Sender Address",
                    "explanation": "The domain 'security-update-portal-net.com' does NOT match your official organization domain 'company.com'. IT departments always use internal organization domain emails."
                },
                {
                    "id": "rf-2",
                    "text": "URGENT: Your Account Will Be Terminated in 2 Hours",
                    "label": "Extreme Urgency & Threats",
                    "explanation": "Attackers create artificial panic to make victims bypass logical thinking and act rashly without verifying."
                },
                {
                    "id": "rf-3",
                    "text": "http://auth-login-pass-verify.com/login?usr=emp",
                    "label": "Insecure HTTP & Suspicious Link",
                    "explanation": "The destination URL uses unencrypted 'http://' and points to a suspicious third-party external domain, not the internal employee portal."
                },
                {
                    "id": "rf-4",
                    "text": "permanent account suspension and IT security escalation",
                    "label": "Fear & Coercion Tactics",
                    "explanation": "Threatening severe penalties like job termination or account locks is a classic psychological manipulation tactic."
                }
            ]),
            "explanations": json.dumps({
                "summary": "This is a classic IT Support Spear Phishing attack designed to steal corporate credentials.",
                "action": "Do NOT click the link. Hover over links to check real URLs. Report the email immediately to your Security Operations Center (SOC) or IT Security team."
            }),
            "hints": json.dumps([
                "Check the sender domain carefully - does it match your company?",
                "Is the tone pressuring you with threats of account deletion?",
                "Look at the URL - is it HTTP or HTTPS, and does it belong to your organization?"
            ])
        },
        {
            "id": "email-2",
            "type": "email",
            "title": "Executive Urgent Wire Transfer Request",
            "category": "Spear Phishing / BEC",
            "sender": "ceo.john.smith@exec-corp-mail.org",
            "sender_name": "John Smith (CEO)",
            "subject": "Confidential Request: Urgent International Vendor Payment",
            "body": "Hi Finance Team,\n\nI am currently in a board meeting with restricted phone access. We are finalizing an confidential acquisition deal and I need an immediate wire transfer of $48,500 made to our key vendor partner today.\n\nPlease wire the funds to the bank details below immediately before 3:00 PM EST:\nBank: Global Offshore Bank\nAccount: 987123654\nRouting: 021000021\n\nDo not discuss this with anyone as this is governed by strict Non-Disclosure Agreements (NDA). Reply once processed.\n\nSent from my iPhone",
            "domain": "exec-corp-mail.org",
            "legitimate_domain": "company.com",
            "red_flags": json.dumps([
                {
                    "id": "rf-1",
                    "text": "ceo.john.smith@exec-corp-mail.org",
                    "label": "Lookalike Domain Spoofing",
                    "explanation": "The email uses '@exec-corp-mail.org' instead of the corporate email '@company.com'. Attackers register lookalike domains to impersonate executives."
                },
                {
                    "id": "rf-2",
                    "text": "restricted phone access",
                    "label": "Pretext to Block Voice Verification",
                    "explanation": "The attacker gives a reason why you cannot call them to verify, isolating the victim in email communications."
                },
                {
                    "id": "rf-3",
                    "text": "Do not discuss this with anyone",
                    "label": "Secrecy & NDA Pressure",
                    "explanation": "Instructing employees to bypass internal payment verification controls and keep secrets is a hallmark of Business Email Compromise (BEC)."
                }
            ]),
            "explanations": json.dumps({
                "summary": "Business Email Compromise (BEC) attack targeting financial personnel.",
                "action": "Always verify wire transfer requests via out-of-band communication (e.g., calling the CEO on a verified phone number or asking an executive assistant in person)."
            }),
            "hints": json.dumps([
                "Notice the executive's email address domain",
                "Why is the sender asking to bypass standard financial approval workflows?",
                "Is phone verification explicitly discouraged?"
            ])
        },
        {
            "id": "fake-login-1",
            "type": "fake_login",
            "title": "Microsoft 365 Deceptive Portal",
            "category": "Credential Harvesting",
            "sender": "no-reply@microsoft-online-security-portal.xyz",
            "sender_name": "Microsoft Security",
            "subject": "Action Required: Session Expired",
            "body": "Your session has expired. Re-authenticate to access your cloud documents.",
            "domain": "microsoft-online-security-portal.xyz",
            "legitimate_domain": "login.microsoftonline.com",
            "red_flags": json.dumps([
                {
                    "id": "rf-1",
                    "text": "http://microsoft-online-security-portal.xyz/auth/login",
                    "label": "Fake Domain Name",
                    "explanation": "Official Microsoft login pages are ALWAYS hosted on 'login.microsoftonline.com' or 'login.live.com'. Beware of '.xyz' or compound domain names."
                },
                {
                    "id": "rf-2",
                    "text": "Not Secure - Certificate Mismatch",
                    "label": "SSL/TLS Inconsistency",
                    "explanation": "The certificate issuer is a generic free authority instead of Microsoft Corporation's verified identity cert."
                },
                {
                    "id": "rf-3",
                    "text": "Outdated Microsoft Logo & Low Resolution UI",
                    "label": "Poor Branding & Layout Artifacts",
                    "explanation": "Notice the misaligned elements, pixelated logos, and missing official footer navigation links."
                }
            ]),
            "explanations": json.dumps({
                "summary": "Fake Microsoft 365 OAuth/Credential harvesting page.",
                "action": "Never enter credentials on unverified domains. Use password managers with auto-fill domain protection—password managers will NOT auto-fill credentials on fake domains!"
            }),
            "hints": json.dumps([
                "Examine the browser address bar domain",
                "Check the security padlock icon details",
                "Look for logo distortions or alignment flaws"
            ])
        },
        {
            "id": "website-1",
            "type": "website",
            "title": "PayPal Payment Verification Clone",
            "category": "Typosquatting & Domain Spoofing",
            "sender": "service@paypa1-security-center.com",
            "sender_name": "PayPal Billing",
            "subject": "Account Suspended: Verify Identity",
            "body": "Suspicious charge detected. Confirm your account details.",
            "domain": "paypa1-security-center.com",
            "legitimate_domain": "paypal.com",
            "red_flags": json.dumps([
                {
                    "id": "rf-1",
                    "text": "paypa1-security-center.com",
                    "label": "Typosquatting (Number '1' for Letter 'l')",
                    "explanation": "The domain replaces the lowercase letter 'l' in PayPal with the number '1' (paypa1). This visually tricks users into believing it is genuine."
                },
                {
                    "id": "rf-2",
                    "text": "Fake Security Badges & VeriSign Icons",
                    "label": "Static Non-Interactive Security Images",
                    "explanation": "Attackers place static images of security seals (McAfee, Norton, VeriSign) that are not clickable or verified."
                },
                {
                    "id": "rf-3",
                    "text": "Claiming $500 Account Lock Penalty",
                    "label": "Excessive Financial Urgency",
                    "explanation": "Demanding immediate payment or credit card details to 'unlock' an account."
                }
            ]),
            "explanations": json.dumps({
                "summary": "Typosquatted financial clone designed to capture credit card and SSN information.",
                "action": "Bookmark official banking and payment websites. Type the web address directly into the browser instead of following email links."
            }),
            "hints": json.dumps([
                "Look closely at the spelling in the URL string",
                "Are the trust seals clickable links or static images?",
                "Is the page asking for full credit card CVV and PIN?"
            ])
        }
    ]

    for p in phishing_examples:
        cursor.execute('''
            INSERT INTO phishing_examples (id, type, title, category, sender, sender_name, subject, body, domain, legitimate_domain, red_flags, explanations, hints)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (p["id"], p["type"], p["title"], p["category"], p["sender"], p["sender_name"], p["subject"], p["body"], p["domain"], p["legitimate_domain"], p["red_flags"], p["explanations"], p["hints"]))

    # Seed Case Studies
    case_studies = [
        {
            "id": "cs-1",
            "title": "Ubiquiti Networks - $39 Million BEC Scam",
            "organization_type": "Technology / Hardware Manufacturer",
            "year": "2015",
            "situation": "Attackers targeted Ubiquiti Networks' finance department by spoofing emails from top executives and external legal counsel.",
            "attack_method": "Business Email Compromise (BEC) & Executive Impersonation using lookalike domains and fabricated payment requests.",
            "noticed_missed": "Employees noticed urgent instructions but missed subtle domain name differences in email headers and failed to perform telephone callback verifications.",
            "consequences": "$39.1 million was transferred overseas across multiple international accounts before the fraud was uncovered.",
            "prevention": "Implementation of multi-person authorization for wire transfers above thresholds and mandatory out-of-band telephone verification.",
            "key_lesson": "Executive authority should never bypass dual-control financial verification procedures."
        },
        {
            "id": "cs-2",
            "title": "Twilio & Cloudflare - Massive Smishing Campaign",
            "organization_type": "Cloud Communications & Cyber Infrastructure",
            "year": "2022",
            "situation": "Employees received SMS text messages claiming their work schedules had changed or password updates were required.",
            "attack_method": "Smishing (SMS Phishing) leading to custom-crafted okta login landing pages equipped with real-time OTP relay capture.",
            "noticed_missed": "Twilio employees entered credentials and 2FA codes on lookalike domains. Cloudflare employees had FIDO2 Hardware Security Keys (YubiKeys) which stopped the attack instantly!",
            "consequences": "Over 130 organizations were targeted; Twilio experienced unauthorized customer data exposure.",
            "prevention": "FIDO2 WebAuthn Hardware Security Keys (YubiKeys) bind authentication directly to the legitimate domain name, neutralizing phishing sites completely.",
            "key_lesson": "Traditional SMS or App 2FA codes can be phished; Hardware FIDO2 keys provide true phishing-resistant MFA."
        },
        {
            "id": "cs-3",
            "title": "RSA Security - The Spear Phishing Breach",
            "organization_type": "Cybersecurity / Security Tokens",
            "year": "2011",
            "situation": "Low-level employees received an email with the subject line '2011 Recruitment Plan' sent to small groups over two days.",
            "attack_method": "Spear Phishing with an attached malicious Excel file containing an unpatched Adobe Flash Zero-Day exploit.",
            "noticed_missed": "Email was filtered into the junk folder, but an employee retrieved it and opened the attachment out of curiosity.",
            "consequences": "Attackers gained access to RSA's network and compromised SecurID authentication token seeds, impacting Fortune 500 defense contractors.",
            "prevention": "Strict email filtering policies, user awareness against opening unexpected junk attachments, and sandbox isolation.",
            "key_lesson": "Curiosity and opening attachments from junk mail can compromise the core security of entire global enterprises."
        },
        {
            "id": "cs-4",
            "title": "Target Corporation - Vendor Credential Theft",
            "organization_type": "Retail Giant",
            "year": "2013",
            "situation": "Attackers compromised an HVAC vendor (Fazio Mechanical) working for Target stores.",
            "attack_method": "Spear phishing email with Citadel malware sent to HVAC vendor employees to steal vendor portal credentials.",
            "noticed_missed": "Vendor lacked anti-malware software; Target did not isolate vendor network access from payment card databases.",
            "consequences": "40 million payment card numbers and 70 million personal records stolen; over $200 million in total losses.",
            "prevention": "Strict third-party supply chain security assessments, zero-trust network segmentation, and multi-factor authentication for third-party vendors.",
            "key_lesson": "Your security is only as strong as your least secure vendor partner."
        }
    ]

    for cs in case_studies:
        cursor.execute('''
            INSERT INTO case_studies (id, title, organization_type, year, situation, attack_method, noticed_missed, consequences, prevention, key_lesson)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (cs["id"], cs["title"], cs["organization_type"], cs["year"], cs["situation"], cs["attack_method"], cs["noticed_missed"], cs["consequences"], cs["prevention"], cs["key_lesson"]))

    # Seed Social Engineering Techniques
    social_engineering = [
        {
            "id": "se-1",
            "title": "Artificial Urgency & Time Pressure",
            "category": "Psychological Trigger",
            "scenario": "An email arrives at 4:50 PM on Friday claiming your tax filing or payroll account will be locked within 30 minutes unless you verify your identity.",
            "attacker_goal": "To trigger panic so you act quickly without double-checking the URL or asking a colleague.",
            "warning_signs": json.dumps([
                "Countdown timers or tight deadlines (e.g. 'Act within 15 minutes')",
                "Threats of severe financial, legal, or employment penalties",
                "Requests to bypass standard review protocols due to emergency"
            ]),
            "safe_response": "Pause and take a deep breath. Real organizations rarely demand urgent action via an unverified email link without advance notice.",
            "icon": "Clock"
        },
        {
            "id": "se-2",
            "title": "Fear & Intimidation",
            "category": "Psychological Trigger",
            "scenario": "A caller or email claims to be from law enforcement, the IRS, or legal council, threatening immediate arrest or a lawsuit unless fine payments are wired immediately.",
            "attacker_goal": "Exploit natural anxiety around legal authority and law enforcement to compel compliance.",
            "warning_signs": json.dumps([
                "Demands for non-traceable payments (wire transfer, gift cards, crypto)",
                "Refusal to allow you to consult an attorney or account representative",
                "High-pressure aggressive tone"
            ]),
            "safe_response": "Hang up or ignore the message. Government agencies and law enforcement NEVER ask for payment via gift cards or crypto, nor do they arrest people based on a single phone call.",
            "icon": "AlertTriangle"
        },
        {
            "id": "se-3",
            "title": "Authority Impersonation",
            "category": "Identity Impersonation",
            "scenario": "You receive a message from 'The Chief Executive Officer' or 'IT Director' requesting urgent access credentials or confidential employee tax forms (W-2s).",
            "attacker_goal": "Leverage organizational hierarchy so lower-level employees comply without questioning power.",
            "warning_signs": json.dumps([
                "Sender uses public domain (e.g., @gmail.com or @exec-corp.org) instead of corporate email",
                "Request violates standard internal HR/Finance operating procedures",
                "Insistence on secrecy ('Keep this between us')"
            ]),
            "safe_response": "Verify through an established internal channel (e.g., company Slack/Teams or phone call to the executive's verified assistant).",
            "icon": "UserCheck"
        },
        {
            "id": "se-4",
            "title": "Trust Exploitation & Pretexting",
            "category": "Relational Manipulation",
            "scenario": "An attacker builds rapport over weeks on LinkedIn or social media posing as an industry recruiter or fellow peer before sending a malicious PDF portfolio.",
            "attacker_goal": "Establish a false sense of friendship and trust so you willingly download executable attachments.",
            "warning_signs": json.dumps([
                "Profiles created recently with generic stock photos",
                "Unusual haste to move conversation to personal email or WhatsApp",
                "Sending executable files (.exe, .scr) disguised as document portfolios"
            ]),
            "safe_response": "Scan all external files with multi-engine security software; never run unknown executable files received via social media.",
            "icon": "HeartHandshake"
        },
        {
            "id": "se-5",
            "title": "Curiosity & Baiting",
            "category": "Behavioral Baiting",
            "scenario": "You find a USB flash drive in the company parking lot labeled 'Confidential_Executive_Salaries_2025.xlsx'.",
            "attacker_goal": "Entice victims into plugging unknown USB devices into corporate endpoints, initiating autorun malware.",
            "warning_signs": json.dumps([
                "Unattended storage media left in public or semi-private areas",
                "Intriguing or scandalous file labels designed to provoke curiosity",
                "Unexpected drop-box downloads on forum websites"
            ]),
            "safe_response": "Never plug unknown USB drives into any computer. Hand them over immediately to your IT or Physical Security team.",
            "icon": "HelpCircle"
        },
        {
            "id": "se-6",
            "title": "Reward, Lottery & Free Offers",
            "category": "Financial Incentive",
            "scenario": "An SMS or popup claims you've won a $1,000 Amazon Gift Card or a free iPad, asking only for a $1 shipping fee to collect.",
            "attacker_goal": "Harvest credit card details, addresses, and personal identifiable information (PII).",
            "warning_signs": json.dumps([
                "Winning contests you never entered",
                "Requirement to pay upfront fees or enter credit card numbers for 'verification'",
                "Generic salutations like 'Dear Lucky Customer'"
            ]),
            "safe_response": "Remember: If something sounds too good to be true, it almost certainly is phishing.",
            "icon": "Gift"
        },
        {
            "id": "se-7",
            "title": "Tech Support Scams",
            "category": "Service Impersonation",
            "scenario": "A loud popup audio alert locks your browser screen with a phone number: 'CRITICAL ERROR! Call Microsoft Tech Support immediately at 1-800-XXX-XXXX'.",
            "attacker_goal": "Convince you to install remote access tools (AnyDesk/TeamViewer) and pay hundreds for fake virus removals.",
            "warning_signs": json.dumps([
                "Websites that prevent tab closing or play alarm sounds",
                "Phone numbers demanding remote control of your PC",
                "Demands for direct payment for built-in operating system diagnostics"
            ]),
            "safe_response": "Force close your browser using Task Manager (Ctrl + Shift + Esc). Real tech support companies will never display random phone popups on third-party websites.",
            "icon": "Headphones"
        },
        {
            "id": "se-8",
            "title": "Impersonation (Smishing / Vishing)",
            "category": "Multi-Channel Attack",
            "scenario": "An SMS text claims your bank account has a pending $450 debit and instructs you to call a phone number or click a shortened link (bit.ly/bank-sec).",
            "attacker_goal": "Direct you to a fake automated phone banking tree or mobile phishing landing page to steal PINs and OTPs.",
            "warning_signs": json.dumps([
                "SMS messages from standard 10-digit mobile numbers claiming to be major banks",
                "Shortened links hiding destination URLs",
                "Requests for full card numbers, PINs, or One-Time Passwords (OTPs)"
            ]),
            "safe_response": "Never call phone numbers inside suspicious text messages. Call the number printed on the back of your debit/credit card.",
            "icon": "Smartphone"
        }
    ]

    for se in social_engineering:
        cursor.execute('''
            INSERT INTO social_engineering (id, title, category, scenario, attacker_goal, warning_signs, safe_response, icon)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (se["id"], se["title"], se["category"], se["scenario"], se["attacker_goal"], se["warning_signs"], se["safe_response"], se["icon"]))

    # Seed Security Tips
    security_tips = [
        {
            "id": "st-1",
            "tip_id": "verify_sender",
            "title": "Verify Sender Addresses Carefully",
            "description": "Don't trust the display name alone. Always expand and inspect the full email address domain (e.g., support@paypal-security.com vs support@paypal.com).",
            "category": "Email Security",
            "importance": "High"
        },
        {
            "id": "st-2",
            "tip_id": "inspect_links",
            "title": "Hover Before Clicking Any Links",
            "description": "Hover over hyperlinks to see the true destination URL in your browser status bar. If the link text says 'bank.com' but points elsewhere, do not click!",
            "category": "Web Security",
            "importance": "High"
        },
        {
            "id": "st-3",
            "tip_id": "check_domains",
            "title": "Check Website Domains & HTTPS",
            "description": "Look closely at domain spelling for typosquatting (e.g. g00gle.com, paypa1.com). Ensure the site uses HTTPS and has a valid SSL certificate.",
            "category": "Web Security",
            "importance": "Medium"
        },
        {
            "id": "st-4",
            "tip_id": "never_share_passwords_otps",
            "title": "Never Share Passwords or OTPs",
            "description": "Legitimate services, banks, and IT departments will NEVER ask for your password or One-Time Password (OTP) via phone, email, or chat.",
            "category": "Account Protection",
            "importance": "Critical"
        },
        {
            "id": "st-5",
            "tip_id": "enable_mfa",
            "title": "Enable Multi-Factor Authentication (MFA)",
            "description": "Turn on MFA / 2FA on all email, banking, and social accounts. Prefer authenticator apps or security hardware keys over SMS codes whenever available.",
            "category": "Account Protection",
            "importance": "Critical"
        },
        {
            "id": "st-6",
            "tip_id": "keep_software_updated",
            "title": "Keep Operating Systems & Browsers Updated",
            "description": "Regularly update web browsers, operating systems, and security tools to patch zero-day vulnerabilities that phishing attacks attempt to exploit.",
            "category": "Device Security",
            "importance": "High"
        },
        {
            "id": "st-7",
            "tip_id": "out_of_band_verify",
            "title": "Verify Unexpected Requests Out-of-Band",
            "description": "If you receive an unexpected request for money, gift cards, or data changes, contact the sender independently via verified phone number or in-person chat.",
            "category": "Verification",
            "importance": "High"
        },
        {
            "id": "st-8",
            "tip_id": "report_phishing",
            "title": "Report Suspicious Messages Immediately",
            "description": "Use your email client's 'Report Phishing' button or alert your internal Security Operations Center (SOC). Reporting helps protect others in your organization.",
            "category": "Incident Response",
            "importance": "Medium"
        },
        {
            "id": "st-9",
            "tip_id": "use_password_manager",
            "title": "Use Dedicated Password Managers",
            "description": "Password managers store unique passwords for every site and will NOT auto-fill credentials on fake phishing domains, protecting you automatically.",
            "category": "Password Hygiene",
            "importance": "High"
        }
    ]

    for st in security_tips:
        cursor.execute('''
            INSERT INTO security_tips (id, tip_id, title, description, category, importance)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (st["id"], st["tip_id"], st["title"], st["description"], st["category"], st["importance"]))

    # Seed Quiz Questions
    quiz_questions = [
        {
            "id": "q-1",
            "question": "You receive an email from 'support@paypa1-security.com' stating your account is suspended and asking you to verify your password immediately. What is the biggest red flag?",
            "options": json.dumps([
                "The email uses a dark color background",
                "The domain uses 'paypa1' (with number 1) instead of official 'paypal.com'",
                "The email was sent during non-business hours",
                "It contains a customer service phone number"
            ]),
            "correct_index": 1,
            "explanation": "The domain name replaces the letter 'l' with the number '1' (paypa1). This is a classic typosquatting technique used by attackers to trick victims.",
            "category": "Domain & Email Inspection",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-2",
            "question": "What is the key difference between Spear Phishing and standard Phishing?",
            "options": json.dumps([
                "Spear phishing only occurs through SMS messages",
                "Spear phishing is highly targeted toward a specific individual or company using personal details",
                "Spear phishing never uses malicious links",
                "Spear phishing is conducted by automated AI bots only"
            ]),
            "correct_index": 1,
            "explanation": "Spear phishing is customized and targeted specifically at an individual or organization using researched information (names, roles, recent events) to increase credibility.",
            "category": "Phishing Types",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-3",
            "question": "An urgent email from your 'CEO' requests an immediate confidential wire transfer of $25,000 to a new supplier, emphasizing that you should NOT discuss this with anyone. What should you do?",
            "options": json.dumps([
                "Process the payment immediately to avoid getting fired",
                "Reply to the email asking if the CEO is sure",
                "Verify the request through an out-of-band communication channel (e.g. phone call to verified number)",
                "Forward the email to a coworker and ask them to pay it"
            ]),
            "correct_index": 2,
            "explanation": "This scenario matches Business Email Compromise (BEC). Always perform out-of-band verification via a known, trusted phone number or in-person channel before initiating wire transfers.",
            "category": "Social Engineering & BEC",
            "question_type": "scenario"
        },
        {
            "id": "q-4",
            "question": "Why is multi-factor authentication (MFA) using Hardware Security Keys (FIDO2/YubiKey) considered phishing-resistant?",
            "options": json.dumps([
                "It sends an SMS code directly to your smartphone",
                "It cryptographically binds authentication to the exact domain origin in the browser bar",
                "It requires typing a 12-digit secret password",
                "It blocks all popups automatically"
            ]),
            "correct_index": 1,
            "explanation": "FIDO2 WebAuthn keys cryptographically bind the authentication token to the specific web origin in the URL bar, making it impossible for fake login sites to pass the token to the real site.",
            "category": "Defensive Security",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-5",
            "question": "What is 'Smishing'?",
            "options": json.dumps([
                "Phishing conducted via phone calls",
                "Phishing conducted via SMS text messages",
                "Phishing conducted via physical mail",
                "Phishing using QR codes"
            ]),
            "correct_index": 1,
            "explanation": "Smishing is SMS Phishing—phishing attacks conducted over SMS text messages sent to mobile phones.",
            "category": "Phishing Types",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-6",
            "question": "You click a link in an email and land on a login page. How can a Password Manager help protect you against fake login sites?",
            "options": json.dumps([
                "It automatically changes your password every hour",
                "It will NOT auto-fill your credentials because the domain name does not match the saved legitimate site",
                "It deletes the phishing email from your inbox",
                "It alerts the FBI automatically"
            ]),
            "correct_index": 1,
            "explanation": "Password managers strictly match credentials to the exact canonical domain name in the browser address bar. On a fake domain, auto-fill will remain empty, warning you of deception.",
            "category": "Defensive Security",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-7",
            "question": "Which psychological trigger is an attacker using when they state: 'Your account will be PERMANENTLY DELETED in 15 minutes unless you confirm your SSN'?",
            "options": json.dumps([
                "Authority and Lawfulness",
                "Artificial Urgency and Fear",
                "Reciprocity and Gratitude",
                "Curiosity and Surprise"
            ]),
            "correct_index": 1,
            "explanation": "Attackers manufacture urgency and fear to provoke immediate panic, reducing the victim's likelihood to critically evaluate the request.",
            "category": "Social Engineering",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-8",
            "question": "What is 'Quishing'?",
            "options": json.dumps([
                "Phishing using QR codes that redirect victims to malicious web pages when scanned",
                "Phishing via voice assistant devices",
                "Phishing via smart TVs",
                "Phishing through encrypted email attachments"
            ]),
            "correct_index": 0,
            "explanation": "Quishing (QR code phishing) involves deceptive QR codes printed on posters, parking meters, or emails that lead users to malicious credential-harvesting pages on mobile devices.",
            "category": "Phishing Types",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-9",
            "question": "If a website URL starts with 'https://' and displays a green padlock icon, does it guarantee the site is 100% safe and legitimate?",
            "options": json.dumps([
                "Yes, HTTPS guarantees that the company is verified and completely safe",
                "No, HTTPS only means the connection is encrypted; cybercriminals can easily obtain free SSL certificates for fake domains",
                "Yes, because web browsers block phishing sites from obtaining SSL certificates",
                "No, HTTPS means the site is for banking only"
            ]),
            "correct_index": 1,
            "explanation": "HTTPS ensures encryption between your browser and the website server, but attackers can easily acquire free SSL certificates (e.g. Let's Encrypt) for phishing domains. Always check the domain name itself!",
            "category": "Web Security",
            "question_type": "multiple_choice"
        },
        {
            "id": "q-10",
            "question": "What is the recommended response if you accidentally clicked a suspicious link and entered your corporate credentials on a fake site?",
            "options": json.dumps([
                "Do nothing and hope the attacker doesn't notice",
                "Immediately change your password on the real site, notify your IT/Security team, and revoke active sessions",
                "Turn off your computer and leave it off for 24 hours",
                "Send an email to the phisher asking them to delete your data"
            ]),
            "correct_index": 1,
            "explanation": "Prompt incident response is crucial. Change the compromised password immediately, notify IT Security/SOC so they can block sessions, and check for unauthorized logins.",
            "category": "Incident Response",
            "question_type": "scenario"
        }
    ]

    for q in quiz_questions:
        cursor.execute('''
            INSERT INTO quiz_questions (id, question, options, correct_index, explanation, category, question_type)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (q["id"], q["question"], q["options"], q["correct_index"], q["explanation"], q["category"], q["question_type"]))

    # Seed Initial User Progress
    cursor.execute('''
        INSERT OR IGNORE INTO user_progress (user_id, completed_modules, completed_lessons, checked_tips, quiz_score, quiz_attempts, learning_level)
        VALUES ('default_user', '["mod-1"]', '["mod-1-l1", "mod-1-l2"]', '["verify_sender", "enable_mfa"]', 80, 1, 'Phishing Defender')
    ''')

    conn.commit()
    conn.close()
