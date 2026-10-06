from flask import Blueprint, jsonify
import json
from database.db import get_db_connection

social_eng_bp = Blueprint('social_engineering', __name__)

@social_eng_bp.route('/api/social-engineering', methods=['GET'])
def get_social_engineering():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM social_engineering")
    rows = cursor.fetchall()
    conn.close()

    items = []
    for row in rows:
        items.append({
            "id": row["id"],
            "title": row["title"],
            "category": row["category"],
            "scenario": row["scenario"],
            "attacker_goal": row["attacker_goal"],
            "warning_signs": json.loads(row["warning_signs"]) if row["warning_signs"] else [],
            "safe_response": row["safe_response"],
            "icon": row["icon"]
        })

    return jsonify({"success": True, "social_engineering": items})
