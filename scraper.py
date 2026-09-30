import json
import requests
from bs4 import BeautifulSoup

def fetch_live_matches():
    # هنا غادي يكون الـ Logic اللي كيسحب المباريات الحية من المصادر المتخصصة
    # كمثال حي لتحديث الملف تلقائياً بمباريات اليوم الحقيقية
    
    updated_matches = [
        {
            "id": 1,
            "tournament": "دوري أبطال أوروبا - مباشر",
            "teamA": "ريال مدريد",
            "logoA": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
            "teamB": "بايرن ميونخ",
            "logoB": "https://upload.wikimedia.org/wikipedia/en/1/1b/FC_Bayern_Munich_logo_%282017%29.svg",
            "time": "مباشر الآن 🔴",
            "streamUrl": "https://www.yalla-shoot.us/embed/live.php?match=real-madrid-vs-bayern"
        }
    ]
    
    with open('matches.json', 'w', encoding='utf-8') as f:
        json.dump(updated_matches, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    fetch_live_matches()
