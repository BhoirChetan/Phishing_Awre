from flask import Flask, jsonify
from flask_cors import CORS
from database.db import init_db
from database.seed_data import seed_database

from routes.modules import modules_bp
from routes.phishing import phishing_bp
from routes.case_studies import case_studies_bp
from routes.social_engineering import social_eng_bp
from routes.security_tips import security_tips_bp
from routes.quiz import quiz_bp
from routes.progress import progress_bp

app = Flask(__name__)
CORS(app)

# Initialize and seed database
with app.app_context():
    init_db()
    seed_database()

# Register blueprints
app.register_blueprint(modules_bp)
app.register_blueprint(phishing_bp)
app.register_blueprint(case_studies_bp)
app.register_blueprint(social_eng_bp)
app.register_blueprint(security_tips_bp)
app.register_blueprint(quiz_bp)
app.register_blueprint(progress_bp)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "Phishing Awareness API"})

if __name__ == '__main__':
    print("🚀 Starting Phishing Awareness Backend on http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
