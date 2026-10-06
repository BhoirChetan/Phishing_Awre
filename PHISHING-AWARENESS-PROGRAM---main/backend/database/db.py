import sqlite3
import os
import json

DB_PATH = os.path.join(os.path.dirname(__file__), 'phishing_awareness.db')

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Modules table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS modules (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            icon TEXT,
            duration TEXT,
            lessons_count INTEGER,
            level TEXT
        )
    ''')

    # Phishing Examples table (Emails, Fake Logins, Website Demos)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS phishing_examples (
            id TEXT PRIMARY KEY,
            type TEXT NOT NULL, -- 'email', 'fake_login', 'website'
            title TEXT NOT NULL,
            category TEXT,
            sender TEXT,
            sender_name TEXT,
            subject TEXT,
            body TEXT,
            domain TEXT,
            legitimate_domain TEXT,
            red_flags TEXT, -- JSON string
            explanations TEXT, -- JSON string
            hints TEXT -- JSON string
        )
    ''')

    # Case Studies table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS case_studies (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            organization_type TEXT NOT NULL,
            year TEXT NOT NULL,
            situation TEXT NOT NULL,
            attack_method TEXT NOT NULL,
            noticed_missed TEXT NOT NULL,
            consequences TEXT NOT NULL,
            prevention TEXT NOT NULL,
            key_lesson TEXT NOT NULL
        )
    ''')

    # Social Engineering Techniques
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS social_engineering (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            scenario TEXT NOT NULL,
            attacker_goal TEXT NOT NULL,
            warning_signs TEXT NOT NULL, -- JSON string
            safe_response TEXT NOT NULL,
            icon TEXT NOT NULL
        )
    ''')

    # Security Tips
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS security_tips (
            id TEXT PRIMARY KEY,
            tip_id TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            category TEXT NOT NULL,
            importance TEXT NOT NULL
        )
    ''')

    # Quiz Questions
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quiz_questions (
            id TEXT PRIMARY KEY,
            question TEXT NOT NULL,
            options TEXT NOT NULL, -- JSON string array
            correct_index INTEGER NOT NULL,
            explanation TEXT NOT NULL,
            category TEXT NOT NULL,
            question_type TEXT DEFAULT 'multiple_choice' -- 'multiple_choice', 'scenario', 'email'
        )
    ''')

    # Quiz Results
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quiz_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT DEFAULT 'default_user',
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage REAL NOT NULL,
            category_breakdown TEXT, -- JSON string
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # User Progress
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_progress (
            user_id TEXT PRIMARY KEY,
            completed_modules TEXT DEFAULT '[]', -- JSON string
            completed_lessons TEXT DEFAULT '[]', -- JSON string
            checked_tips TEXT DEFAULT '[]', -- JSON string
            quiz_score INTEGER DEFAULT 0,
            quiz_attempts INTEGER DEFAULT 0,
            learning_level TEXT DEFAULT 'Cyber Novice',
            last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()
