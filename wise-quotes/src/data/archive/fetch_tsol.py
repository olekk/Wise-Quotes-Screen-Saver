import json
import requests
import re

def fetch_article_fields(link):
    # Extract slug from URL
    slug = link.rstrip("/").split("/")[-1]
    api_url = f"https://www.theschooloflife.com/wp-json/wp/v2/article?slug={slug}"

    try:
        response = requests.get(api_url, timeout=10)
        response.raise_for_status()

        data = response.json()

        if not data:
            print(f"[!] Empty API response for slug: {slug}")
            return "", ""

        article = data[0]

        # Extract HTML content
        html = article.get("content", {}).get("rendered", "")
        text = re.sub("<[^>]+>", "", html).strip()

        # Extract title
        title_html = article.get("title", {}).get("rendered", "")
        title = re.sub("<[^>]+>", "", title_html).strip()

        return text, title

    except Exception as e:
        print(f"[ERROR] {e} for slug: {slug}")
        return "", ""


def enrich_json_with_full_text_and_title(input_file, output_file):
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    for entry in data:
        link = entry.get("link")
        entry_id = entry.get("id", "<NO ID>")

        if link:
            print(f"Fetching content for {entry_id} ...")
            full_text, full_title = fetch_article_fields(link)
            entry["full_text"] = full_text
            entry["full_title"] = full_title

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# Run:
enrich_json_with_full_text_and_title(
    "The-School-Of-Life-EN-new.json",
    "The-School-Of-Life-EN-new.json"
)
