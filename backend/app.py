# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from logic.response_handler import generate_response  # tambahkan ini

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    bot_reply = generate_response(user_message)
    return jsonify({'response': bot_reply})

if __name__ == '__main__':
    app.run(debug=True)
