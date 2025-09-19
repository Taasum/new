# scripts/fetch_mandi_prices.py
import json
import time
import argparse
from datetime import date, datetime
from pathlib import Path
import requests
import pandas as pd

# ---------------- PATHS ---------------- #
ROOT = Path(__file__).resolve().parents[1]
CONFIG_FILE = ROOT / "db" / "config.json"
RESOURCE_ID = "35985678-0d79-46b4-9ed6-6f13308a1d24"  # mandi price API resource id

if not CONFIG_FILE.exists():
    raise SystemExit("ERROR: db/config.json missing. Create it and add your API_KEY.")

api_key = json.loads(CONFIG_FILE.read_text())["API_KEY"]

OUT_DIR = ROOT / "data" / "mandi_prices"
RAW_DIR = OUT_DIR / "raw_api"
OUT_DIR.mkdir(parents=True, exist_ok=True)
RAW_DIR.mkdir(parents=True, exist_ok=True)

BASE_URL = f"https://api.data.gov.in/resource/{RESOURCE_ID}"

# ---------------- FETCH FUNCTION ---------------- #
def fetch_all(commodity=None, state=None, limit=1000, max_records=5000):
    offset = 0
    all_records = []

    # Today's date in DD/MM/YYYY format for API filter
    today_str = date.today().strftime("%d/%m/%Y")

    while True:
        params = {
            "api-key": api_key,
            "format": "json",
            "limit": limit,
            "offset": offset,
            "from_date": today_str,   # ✅ fetch today's data only
            "to_date": today_str      # ✅ fetch today's data only
        }
        if commodity:
            params["filters[Commodity]"] = commodity
        if state:
            params["filters[State]"] = state

        print(f"Requesting offset={offset}, limit={limit} ...")
        r = requests.get(BASE_URL, params=params, timeout=30)
        r.raise_for_status()
        j = r.json()

        # save raw API response
        fname = RAW_DIR / f"{date.today().isoformat()}_offset{offset}.json"
        with open(fname, "w", encoding="utf-8") as f:
            json.dump(j, f, ensure_ascii=False, indent=2)

        # extract records
        records = j.get("records") or j.get("data") or []
        if not records:
            print("⚠️ No more records, stopping.")
            break

        all_records.extend(records)

        # agar last page me limit se kam record aaye => stop
        if len(records) < limit:
            break

        offset += limit

        # stop after max_records
        if offset >= max_records:
            print(f"⚠️ Reached max_records={max_records}, stopping.")
            break

        time.sleep(0.2)  # avoid hammering API

    return all_records

# ---------------- SAVE FUNCTION ---------------- #
def save_csv(records):
    if not records:
        print("No records fetched.")
        return

    df = pd.DataFrame(records)
    df.columns = [c.strip() for c in df.columns]

    today_csv = OUT_DIR / f"mandi_today_{date.today().isoformat()}.csv"
    history_csv = OUT_DIR / "mandi_history.csv"

    df.to_csv(today_csv, index=False)

    if history_csv.exists():
        old = pd.read_csv(history_csv, dtype=str)
        merged = pd.concat([old, df.astype(str)], ignore_index=True)

        subset = ["State","District","Market","Commodity","Variety","Arrival_Date","Modal_Price"]
        subset = [s for s in subset if s in merged.columns]

        if subset:
            merged = merged.drop_duplicates(subset=subset, keep="last")

        merged.to_csv(history_csv, index=False)
    else:
        df.to_csv(history_csv, index=False)

    print(f"✅ Saved {len(df)} rows to {today_csv} and updated history.")

# ---------------- MAIN ---------------- #
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--commodity", help="Filter by commodity (e.g. Wheat)")
    parser.add_argument("--state", help="Filter by State (e.g. Uttar Pradesh)")
    parser.add_argument("--limit", type=int, default=1000, help="records per page (max ~1000)")
    parser.add_argument("--max", type=int, default=5000, help="max total records to fetch")
    args = parser.parse_args()

    print("🚀 Starting fetch at", datetime.now().isoformat())
    recs = fetch_all(
        commodity=args.commodity,
        state=args.state,
        limit=args.limit,
        max_records=args.max
    )
    save_csv(recs)
    print("✅ Done at", datetime.now().isoformat())
