# backend/logic/response_handler.py

def generate_response(message):
    message = message.lower()

    if any(greet in message for greet in ["hai", "halo", "hei", "hey", "hello"]):
        return "Hai juga! Aku Aira, chatbot kampusmu. Gimana kabarmu hari ini?"

    elif "stres" in message or "capek" in message or "lelah" in message:
        return "Aku turut prihatin, ya. Kalau kamu mau cerita, aku siap dengerin. Ingin Aira bantu kasih tips relaksasi?"

    elif "jadwal" in message or "ujian" in message:
        return "Kamu bisa cek jadwal ujian di portal mahasiswa Universitas Nusa Putra. Aira bisa bantu kasih link-nya kalau kamu mau."

    elif "terima kasih" in message or "makasih" in message:
        return "Sama-sama! Jangan lupa istirahat juga, ya 💪"

    elif "siapa kamu" in message or "kamu siapa" in message:
        return "Aku Aira, chatbot kampus Universitas Nusa Putra yang siap bantu kamu kapan pun!"

    else:
        return "Maaf, Aira belum ngerti maksudmu 😅. Bisa ulangin pertanyaannya dengan cara lain?"
