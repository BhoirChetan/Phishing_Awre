from flask import Blueprint, jsonify
import json
from database.db import get_db_connection

modules_bp = Blueprint('modules', __name__)

@modules_bp.route('/api/modules', methods=['GET'])
def get_modules():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM modules")
    rows = cursor.fetchall()
    conn.close()

    modules = []
    for row in rows:
        modules.append({
            "id": row["id"],
            "title": row["title"],
            "category": row["category"],
            "description": row["description"],
            "icon": row["icon"],
            "duration": row["duration"],
            "lessons_count": row["lessons_count"],
            "level": row["level"]
        })
    
    return jsonify({"success": True, "modules": modules})
