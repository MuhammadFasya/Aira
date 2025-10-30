# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

# Simple in-memory session memory (per process)
# NOTE: for production, use per-user session or DB
chat_history = []  # list of {'sender': 'user'/'aira', 'text': '...'}

def analyze_sentiment(text):
    """
    Return one of: 'positive', 'neutral', 'negative'
    Using TextBlob polarity with thresholding.
    """
    try:
        tb = TextBlob(text)
        polarity = tb.sentiment.polarity  # -1 .. +1
    except Exception as e:
        # fallback neutral if TextBlob fails
        print("TextBlob error:", e)
        polarity = 0.0

    if polarity > 0.2:
        return "positive"
    elif polarity < -0.2:
        return "negative"
    else:
        return "neutral"

def generate_response(user_message, sentiment):
    """
    Generate a simple response using both the message and the detected sentiment,
    plus very simple context-awareness from chat_history.
    """
    lower = user_message.lower()

    # Allow explicit reset keywords
    if any(k in lower for k in ["reset", "mulai dari awal", "ulang"]):
        chat_history.clear()
        return "Oke, percakapan direset. Kita mulai dari awal ya 😊"

    # Greetings
    if any(g in lower for g in ["hai", "halo", "hey", "hello"]):
        return "Hai! Aku Aira — senang bisa ngobrol. Gimana kabarmu hari ini?"

    # Direct content-based replies
    if "capek" in lower or "lelah" in lower:
        return "Kelihatan kamu capek. Coba istirahat sebentar dan minum air ya — mau cerita penyebabnya?"
    if "stres" in lower or "stressing" in lower:
        return "Stres itu berat. Kalau mau, ceritain dulu apa yang bikin stres, aku dengerin."
    if "terima kasih" in lower or "makasih" in lower:
        return "Sama-sama! Senang bisa bantu."

    # Context aware fallback: check last user message (if any)
    last_user = None
    for msg in reversed(chat_history):
        if msg["sender"] == "user":
            last_user = msg["text"].lower()
            break

    if last_user:
        if "capek" in last_user and sentiment == "negative":
            return "Masih capek ya? Coba tidur sebentar atau jangan paksain diri. Mau tips relaksasi singkat?"
        if "stres" in last_user and sentiment == "negative":
            return "Kedengarannya beban berat. Mau kita coba breakdown tugas satu-satu?"

    # Sentiment-based generic replies
    if sentiment == "positive":
        return "Wah, bagus! Senang dengarnya 😊 Kalau mau, ceritain yuk apa yang membuatmu senang."
    if sentiment == "negative":
        return "Aku turut prihatin. Kamu mau cerita lebih detail, atau Aira bantu kasih beberapa saran rileksasi?"
    return "Aku dengerin — coba ceritain lebih lanjut supaya aku bisa bantu."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"response": "Kamu belum menulis pesan apa pun."})

    # record user message
    chat_history.append({"sender": "user", "text": user_message})

    # analyze sentiment
    sentiment = analyze_sentiment(user_message)

    # generate response
    response_text = generate_response(user_message, sentiment)

    # record bot message
    chat_history.append({"sender": "aira", "text": response_text})

    return jsonify({
        "response": response_text,
        "sentiment": sentiment,
        "history_length": len(chat_history)
    }), 200

@app.route("/reset", methods=["POST"])
def reset():
    chat_history.clear()
    return jsonify({"response": "Percakapan sudah direset."}), 200

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "AIRA API running"}), 200

if __name__ == "__main__":
    app.run(debug=True)
