import json
from openai import OpenAI
import os

# Pobieramy klucz API bezpośrednio ze zmiennej środowiskowej
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def translate_text(text, style="Przetłumacz na polski, zachowując styl oryginału."):
    prompt = f"{style}\n\n{text}"

    estimated_output_tokens = len(text) // 2  # approx. 1 token per 3 chars
    
    response = client.responses.create(
        model="gpt-5.1",
        input=prompt,
        max_output_tokens=max(500, estimated_output_tokens),  # min 500, dynamic otherwise
    )
    return response.output_text.strip()

def process_json(input_file, output_file):
    # Jeśli istnieje już plik wynikowy, wczytaj go i kontynuuj
    if os.path.exists(output_file):
        with open(output_file, "r", encoding="utf-8") as f:
            translated_data = json.load(f)
            translated_ids = {q['id'] for q in translated_data['quotes']}
    else:
        translated_data = {
            "collection": {
                "title": "The School Of Life (Translated)",
                "version": 1,
                "language": "pl"
            },
            "quotes": []
        }
        translated_ids = set()

    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    for quote in data["quotes"]:
        output_id = quote["id"].replace("EN", "PL")

        # Pomijamy już przetłumaczone artykuły
        if output_id in translated_ids:
            print(f"Pominięto (już przetłumaczono): {output_id}")
            continue

        print(f"Tłumaczenie artykułu: {quote['id']}...")
        translated_title = translate_text(quote["title"])
        translated_text = translate_text(quote["text"])

        translated_data["quotes"].append({
            "id": output_id,
            "title": translated_title,
            "text": translated_text
        })

        # Zapis po każdym artykule
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)

        print(f"Zapisano: {output_id}")

    print(f"Proces ukończony. Wynik zapisano do {output_file}")

if __name__ == "__main__":
    process_json("The-School-Of-Life-EN.json", "The-School-Of-Life-PL-new.json")
