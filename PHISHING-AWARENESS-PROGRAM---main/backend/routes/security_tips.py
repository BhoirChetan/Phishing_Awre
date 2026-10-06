from flask import Blueprint, jsonify
from database.db import get_db_connection

security_tips_bp = Blueprint('security_tips', __name__)

@security_tips_bp.route('/api/security-tips', methods=['GET'])
def get_security_tips():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM security_tips")
    rows = cursor.fetchall()
    conn.close()

    tips = []
    for row in rows:
        tips.append({
            "id": row["id"],
            "tip_id": row["tip_id"],
            "title": row["title"],
            "description": row["description"],
            "category": row["category"],
            "importance": row["importance"]
        })

    return jsonify({"success": True, "tips": tips})
