from flask import Blueprint, jsonify
from database.db import get_db_connection

case_studies_bp = Blueprint('case_studies', __name__)

@case_studies_bp.route('/api/case-studies', methods=['GET'])
def get_case_studies():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM case_studies")
    rows = cursor.fetchall()
    conn.close()

    case_studies = []
    for row in rows:
        case_studies.append({
            "id": row["id"],
            "title": row["title"],
            "organization_type": row["organization_type"],
            "year": row["year"],
            "situation": row["situation"],
            "attack_method": row["attack_method"],
            "noticed_missed": row["noticed_missed"],
            "consequences": row["consequences"],
            "prevention": row["prevention"],
            "key_lesson": row["key_lesson"]
        })

    return jsonify({"success": True, "case_studies": case_studies})
