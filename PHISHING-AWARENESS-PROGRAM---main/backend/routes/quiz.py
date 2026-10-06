from flask import Blueprint, jsonify, request
import json
from database.db import get_db_connection

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/api/quiz/questions', methods=['GET'])
def get_quiz_questions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM quiz_questions")
    rows = cursor.fetchall()
    conn.close()

    questions = []
    for row in rows:
        questions.append({
            "id": row["id"],
            "question": row["question"],
            "options": json.loads(row["options"]) if row["options"] else [],
            "correct_index": row["correct_index"],
            "explanation": row["explanation"],
            "category": row["category"],
            "question_type": row["question_type"]
        })

    return jsonify({"success": True, "questions": questions})

@quiz_bp.route('/api/quiz/submit', methods=['POST'])
def submit_quiz():
    data = request.get_json() or {}
    answers = data.get('answers', {}) # dict of question_id -> selected_index
    user_id = data.get('user_id', 'default_user')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM quiz_questions")
    rows = cursor.fetchall()

    correct_count = 0
    total_questions = len(rows)
    detailed_results = []
    category_scores = {}

    for row in rows:
        q_id = row["id"]
        correct_idx = row["correct_index"]
        user_choice = answers.get(q_id, None)
        is_correct = (user_choice == correct_idx)

        if is_correct:
            correct_count += 1

        cat = row["category"]
        if cat not in category_scores:
            category_scores[cat] = {"total": 0, "correct": 0}
        category_scores[cat]["total"] += 1
        if is_correct:
            category_scores[cat]["correct"] += 1

        detailed_results.append({
            "question_id": q_id,
            "question": row["question"],
            "selected_option": user_choice,
            "correct_option": correct_idx,
            "is_correct": is_correct,
            "explanation": row["explanation"],
            "category": cat
        })

    percentage = round((correct_count / total_questions) * 100, 1) if total_questions > 0 else 0

    # Record result in database
    cursor.execute('''
        INSERT INTO quiz_results (user_id, score, total_questions, percentage, category_breakdown)
        VALUES (?, ?, ?, ?, ?)
    ''', (user_id, correct_count, total_questions, percentage, json.dumps(category_scores)))

    # Update user_progress
    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
    p_row = cursor.fetchone()
    
    attempts = 1
    if p_row:
        attempts = p_row["quiz_attempts"] + 1
        cursor.execute('''
            UPDATE user_progress 
            SET quiz_score = MAX(quiz_score, ?), quiz_attempts = ?, last_updated = CURRENT_TIMESTAMP
            WHERE user_id = ?
        ''', (int(percentage), attempts, user_id))
    else:
        cursor.execute('''
            INSERT INTO user_progress (user_id, quiz_score, quiz_attempts)
            VALUES (?, ?, ?)
        ''', (user_id, int(percentage), 1))

    conn.commit()
    conn.close()

    # Identify improvement areas
    improvement_areas = []
    recommended_lessons = []
    for cat, stats in category_scores.items():
        cat_pct = (stats["correct"] / stats["total"]) * 100
        if cat_pct < 70:
            improvement_areas.append(f"{cat} ({round(cat_pct)}% score)")
            recommended_lessons.append(f"Review module for {cat}")

    return jsonify({
        "success": True,
        "score": correct_count,
        "total_questions": total_questions,
        "percentage": percentage,
        "detailed_results": detailed_results,
        "category_breakdown": category_scores,
        "improvement_areas": improvement_areas,
        "recommended_lessons": recommended_lessons
    })
