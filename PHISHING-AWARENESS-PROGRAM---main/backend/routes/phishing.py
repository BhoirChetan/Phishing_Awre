from flask import Blueprint, jsonify, request
import json
from database.db import get_db_connection

phishing_bp = Blueprint('phishing', __name__)

@phishing_bp.route('/api/phishing-examples', methods=['GET'])
def get_phishing_examples():
    type_filter = request.args.get('type')
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if type_filter:
        cursor.execute("SELECT * FROM phishing_examples WHERE type = ?", (type_filter,))
    else:
        cursor.execute("SELECT * FROM phishing_examples")
        
    rows = cursor.fetchall()
    conn.close()

    examples = []
    for row in rows:
        examples.append({
            "id": row["id"],
            "type": row["type"],
            "title": row["title"],
            "category": row["category"],
            "sender": row["sender"],
            "sender_name": row["sender_name"],
            "subject": row["subject"],
            "body": row["body"],
            "domain": row["domain"],
            "legitimate_domain": row["legitimate_domain"],
            "red_flags": json.loads(row["red_flags"]) if row["red_flags"] else [],
            "explanations": json.loads(row["explanations"]) if row["explanations"] else {},
            "hints": json.loads(row["hints"]) if row["hints"] else []
        })

    return jsonify({"success": True, "examples": examples})
