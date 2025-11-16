import os
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
from google import genai
from dotenv import load_dotenv

# === Load environment variables ===
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# === Initialize Gemini client ===
try:
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("✅ Gemini API connected successfully.")
except Exception as e:
    print("⚠️ Failed to connect Gemini API:", e)
    client = None

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# === Simple in-memory chat session ===
chat_history = []  # [{'sender': 'user'/'aira', 'text': '...'}]


# === Sentiment Analysis ===
def analyze_sentiment(text):
    """Detect basic sentiment using TextBlob."""
    polarity = TextBlob(text).sentiment.polarity
    if polarity > 0.2:
        return "positive"
    elif polarity < -0.2:
        return "negative"
    else:
        return "neutral"


# === Generate AI Response ===
def generate_response(user_message, sentiment):
    """
    Use Gemini API for empathetic response.
    Fallback to rule-based responses if Gemini unavailable.
    """
    lower = user_message.lower()

    # Reset conversation
    if any(k in lower for k in ["reset", "mulai dari awal", "ulang"]):
        chat_history.clear()
        return "Oke, percakapan direset. Kita mulai dari awal ya 😊"

    # ====== Gemini Integration ======
    if client:
        try:
            prompt = f"""
Kamu adalah Aira, chatbot yang empatik, ramah, dan menenangkan.
Gunakan gaya santai tapi tetap sopan, tanpa terlalu formal.
Analisis sentimen pengguna: {sentiment}
Pesan pengguna: "{user_message}"

Beri balasan dengan nada yang sesuai perasaan pengguna.
Hindari menjawab terlalu panjang, maksimal 2 kalimat.
"""
            result = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )
            if result and result.text:
                return result.text.strip()
        except Exception as e:
            print("⚠️ Gemini error:", e)

    # ====== Fallback responses ======
    if any(g in lower for g in ["hai", "halo", "hey", "hello"]):
        return random.choice([
            "Hai! Aku Aira — senang bisa ngobrol. Gimana kabarmu hari ini?",
            "Halo! Lagi santai atau sibuk nih?",
            "Hai hai 👋 gimana perasaanmu hari ini?"
        ])

    if "capek" in lower or "lelah" in lower:
        return "Kelihatan kamu capek. Coba istirahat sebentar dan minum air ya — mau cerita penyebabnya?"

    if "stres" in lower or "stress" in lower:
        return "Stres itu berat. Kalau mau, ceritain dulu apa yang bikin stres, aku dengerin."

    if "terima kasih" in lower or "makasih" in lower:
        return random.choice([
            "Sama-sama! Senang bisa bantu 🤍",
            "Kapan pun! Aku senang bisa nemenin kamu 😄",
            "No problem! Semoga harimu jadi lebih baik ya."
        ])

    if sentiment == "positive":
        return random.choice([
            "Senang banget denger kamu bahagia 😊",
            "Itu kabar bagus! Ceritain lebih lanjut dong!",
            "Wah, keren! Aku ikut semangat jadinya!"
        ])

    if sentiment == "negative":
        return random.choice([
            "Aku ngerti kok. Kadang berat banget buat tetap kuat, tapi kamu gak sendiri.",
            "Hmm... kelihatannya kamu lagi sedih ya. Mau aku temenin cerita?",
            "Aku di sini kok, pelan-pelan aja ya ❤️"
        ])

    # Default fallback
    return random.choice([
        "Aku dengerin — coba ceritain lebih lanjut supaya aku bisa bantu.",
        "Hmm... menarik. Bisa jelasin sedikit lebih detail?",
        "Aku di sini buat dengerin, lanjut aja ceritanya ya."
    ])


# === ROUTES ===
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"response": "Kamu belum menulis pesan apa pun."}), 400

    chat_history.append({"sender": "user", "text": user_message})
    sentiment = analyze_sentiment(user_message)
    response_text = generate_response(user_message, sentiment)
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
    return jsonify({"message": "AIRA (Gemini) API running"}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
