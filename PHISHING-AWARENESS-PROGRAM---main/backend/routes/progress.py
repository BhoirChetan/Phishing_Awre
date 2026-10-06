from flask import Blueprint, jsonify, request
import json
from database.db import get_db_connection

progress_bp = Blueprint('progress', __name__)

@progress_bp.route('/api/progress', methods=['GET'])
def get_progress():
    user_id = request.args.get('user_id', 'default_user')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({
            "success": True,
            "progress": {
                "user_id": user_id,
                "completed_modules": [],
                "completed_lessons": [],
                "checked_tips": [],
                "quiz_score": 0,
                "quiz_attempts": 0,
                "learning_level": "Cyber Novice"
            }
        })

    completed_mods = json.loads(row["completed_modules"]) if row["completed_modules"] else []
    completed_less = json.loads(row["completed_lessons"]) if row["completed_lessons"] else []
    checked_tips = json.loads(row["checked_tips"]) if row["checked_tips"] else []

    # Calculate Level based on activity
    score = row["quiz_score"] or 0
    total_completed = len(completed_mods) + len(checked_tips)
    level = "Cyber Novice"
    if score >= 90 and total_completed >= 8:
        level = "Cyber Guardian"
    elif score >= 70 or total_completed >= 4:
        level = "Phishing Defender"

    return jsonify({
        "success": True,
        "progress": {
            "user_id": row["user_id"],
            "completed_modules": completed_mods,
            "completed_lessons": completed_less,
            "checked_tips": checked_tips,
            "quiz_score": score,
            "quiz_attempts": row["quiz_attempts"] or 0,
            "learning_level": level
        }
    })

@progress_bp.route('/api/progress/update', methods=['POST'])
def update_progress():
    data = request.get_json() or {}
    user_id = data.get('user_id', 'default_user')
    completed_modules = data.get('completed_modules')
    completed_lessons = data.get('completed_lessons')
    checked_tips = data.get('checked_tips')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()

    if not row:
        cursor.execute('''
            INSERT INTO user_progress (user_id, completed_modules, completed_lessons, checked_tips)
            VALUES (?, ?, ?, ?)
        ''', (
            user_id,
            json.dumps(completed_modules or []),
            json.dumps(completed_lessons or []),
            json.dumps(checked_tips or [])
        ))
    else:
        current_mods = json.loads(row["completed_modules"]) if row["completed_modules"] else []
        current_less = json.loads(row["completed_lessons"]) if row["completed_lessons"] else []
        current_tips = json.loads(row["checked_tips"]) if row["checked_tips"] else []

        if completed_modules is not None:
            current_mods = list(set(current_mods + completed_modules))
        if completed_lessons is not None:
            current_less = list(set(current_less + completed_lessons))
        if checked_tips is not None:
            current_tips = checked_tips # set directly or toggle

        cursor.execute('''
            UPDATE user_progress
            SET completed_modules = ?, completed_lessons = ?, checked_tips = ?, last_updated = CURRENT_TIMESTAMP
            WHERE user_id = ?
        ''', (
            json.dumps(current_mods),
            json.dumps(current_less),
            json.dumps(current_tips),
            user_id
        ))

    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Progress updated successfully"})

@progress_bp.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    user_id = request.args.get('user_id', 'default_user')
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM modules")
    total_modules = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM security_tips")
    total_tips = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM case_studies")
    total_case_studies = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM quiz_questions")
    total_questions = cursor.fetchone()[0]

    cursor.execute("SELECT * FROM user_progress WHERE user_id = ?", (user_id,))
    row = cursor.fetchone()

    completed_mods = json.loads(row["completed_modules"]) if row and row["completed_modules"] else []
    completed_less = json.loads(row["completed_lessons"]) if row and row["completed_lessons"] else []
    checked_tips = json.loads(row["checked_tips"]) if row and row["checked_tips"] else []
    quiz_score = row["quiz_score"] if row and row["quiz_score"] else 0
    quiz_attempts = row["quiz_attempts"] if row and row["quiz_attempts"] else 0

    # Calculate overall progress percentage
    modules_pct = (len(completed_mods) / total_modules * 100) if total_modules > 0 else 0
    tips_pct = (len(checked_tips) / total_tips * 100) if total_tips > 0 else 0
    quiz_pct = quiz_score

    overall_progress = round((modules_pct * 0.4) + (tips_pct * 0.3) + (quiz_pct * 0.3), 1)

    # Determine learning level
    level = "Cyber Novice"
    if overall_progress >= 85 and quiz_score >= 80:
        level = "Cyber Guardian"
    elif overall_progress >= 40 or quiz_score >= 60:
        level = "Phishing Defender"

    conn.close()

    return jsonify({
        "success": True,
        "stats": {
            "overall_progress_percentage": overall_progress,
            "total_modules": total_modules,
            "completed_modules_count": len(completed_mods),
            "completed_lessons_count": len(completed_less),
            "total_tips": total_tips,
            "checked_tips_count": len(checked_tips),
            "quiz_score": quiz_score,
            "quiz_attempts": quiz_attempts,
            "learning_level": level,
            "total_case_studies": total_case_studies,
            "recommended_next_module": "Email Inspection & Red Flags" if len(completed_mods) < 2 else "Fake Login & Credential Harvesting"
        }
    })
