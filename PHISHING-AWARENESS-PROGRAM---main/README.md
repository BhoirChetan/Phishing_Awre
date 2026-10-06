# Phishing Awareness Web Application 🛡️

A modern, interactive, full-stack cybersecurity training platform built with **React, Vite, Tailwind CSS**, and a **Python Flask REST API** backed by **SQLite**. 

This application empowers users to recognize, analyze, and defend against modern phishing attacks, social engineering tactics, credential harvesting portals, and typosquatted websites.

---

## 🌟 Core Features & Training Modules

### 1. **Landing Page**
- Cybersecurity dark-mode aesthetic with glowing accents and terminal styling.
- Hero section highlighting the global impact of phishing and statistics.
- Quick navigation CTAs ("Start Training", "Take Quiz", "Spot Red Flags").

### 2. **Phishing Basics (`/learn`)**
- Educational breakdown of phishing concepts: What is phishing, attack mechanics, and key target groups.
- Interactive explorer for 7 specialized phishing vectors:
  - Email Phishing
  - Spear Phishing
  - Whaling (Executive Impersonation)
  - Smishing (SMS Text Scams)
  - Vishing (Voice Call Scams)
  - Clone Phishing
  - Quishing (QR-Code Phishing)

### 3. **Identify Suspicious Emails — Simulator (`/email-simulator`)**
- Interactive email inspection client with **"Spot the Red Flags"** interaction.
- Clickable inspection zones (Sender address, subject line urgency, unencrypted links).
- Real-time feedback explaining malicious indicators and counter-measures.

### 4. **Fake Login Sandbox (`/fake-login`)**
- Safe educational sandbox simulating Microsoft 365 OAuth credential harvesting portals.
- Toggle comparison between **Legitimate** vs **Fake Clone** portals.
- Domain name inspection, SSL padlock status checks, and dummy-only input forms.

### 5. **Fraudulent Website & Typosquatting Detector (`/website-detector`)**
- Side-by-side comparison of authentic websites vs typosquatted lookalikes (e.g. `paypa1.com`, `micros0ft-support.net`).
- Identification of character substitution, fake trust seals, and unexpected download prompts.

### 6. **Social Engineering Techniques (`/social-engineering`)**
- Deep dive into 8 psychological triggers: Urgency, Fear, Authority Impersonation, Trust Exploitation, Curiosity, Reward/Lottery Scams, Tech-Support Scams, and Mobile Smishing.
- 4-step structured breakdown for every technique: **Scenario → Attacker Goal → Warning Signs → Safe Response**.

### 7. **Real-Life Case Studies (`/case-studies`)**
- Card and timeline-based analysis of multi-million dollar corporate breaches (Ubiquiti $39M BEC, Twilio Smishing, RSA SecurID Spear Phishing, Target Vendor Theft).
- Details situation, attack vector, victim missteps, financial consequences, prevention strategies, and key lessons.

### 8. **Interactive Quiz System (`/quiz`)**
- Multiple-choice and scenario-based cybersecurity questions.
- Immediate explanation feedback per question.
- Performance scoring, accuracy breakdown, area improvement analysis, and option to retake.

### 9. **Security Hygiene Checklist (`/security-tips`)**
- Interactive checklist covering 9 fundamental security habits (Verifying senders, link hovering, MFA setup, password managers, out-of-band verification).
- Check items off to update your defense progress in real-time.

### 10. **Progress Dashboard (`/dashboard`)**
- Visual metrics tracking training progress percentage, completed modules, quiz accuracy, and checklist status.
- Current Learning Level badge assignment: *Cyber Novice*, *Phishing Defender*, *Cyber Guardian*.

---

## 🔒 Security Compliance Notice

> **IMPORTANT:** This application is strictly built for **defensive cybersecurity education and awareness**.
> - Does **NOT** harvest, store, or transmit real credentials or passwords.
> - Operates entirely within a controlled, local sandbox environment.

---

## 🏗️ Project Architecture & Tech Stack

```text
phishing-awareness/
│
├── frontend/                     # React + Vite + Tailwind CSS + Lucide React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/               # Home, PhishingBasics, EmailSimulator, FakeLogin, etc.
│   │   ├── layouts/             # Navbar, Footer, Main Layout
│   │   ├── services/            # API client layer (api.js)
│   │   ├── App.jsx              # React Router setup
│   │   └── index.css            # Tailwind CSS v4 setup
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Python Flask + SQLite
│   ├── app.py                   # Main Flask server entrypoint
│   ├── database/
│   │   ├── db.py                # SQLite schema setup
│   │   └── seed_data.py         # Initial seed dataset
│   ├── routes/                  # API endpoints (modules, phishing, quiz, progress)
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 How to Run the Application Locally

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### Step 1: Start the Backend Server (Flask)

Open a terminal, navigate to the `backend/` directory, install dependencies, and run `app.py`:

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The Flask API will start on **`http://localhost:5000`**. The SQLite database (`phishing_awareness.db`) will be automatically initialized and seeded with rich educational content on startup.

### Step 2: Start the Frontend Application (React + Vite)

Open a second terminal, navigate to the `frontend/` directory, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on **`http://localhost:3000`** and proxy API requests automatically to the backend!

---

## ⚡ API Endpoints Summary

- `GET /api/modules` - List all training modules
- `GET /api/phishing-examples` - Fetch email & fake login simulation scenarios
- `GET /api/case-studies` - Fetch real-world breach case studies
- `GET /api/social-engineering` - Fetch social engineering tactics
- `GET /api/security-tips` - Fetch security checklist rules
- `GET /api/quiz/questions` - Fetch quiz questions
- `POST /api/quiz/submit` - Submit quiz answers and calculate results
- `GET /api/progress` - Get user progress & learning level
- `POST /api/progress/update` - Save user training progress
- `GET /api/dashboard/stats` - Fetch overall dashboard metrics
