# scripts/get_price.py
import argparse
import pandas as pd
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HISTORY = ROOT / "data" / "mandi_prices" / "mandi_history.csv"

def find_price(commodity, state=None):
    if not HISTORY.exists():
        print("No mandi_history.csv found. Run fetch_mandi_prices.py first.")
        return None
    df = pd.read_csv(HISTORY, dtype=str)
    df = df[df['Commodity'].str.lower()==commodity.lower()]
    if state:
        df = df[df['State'].str.lower()==state.lower()]
    if df.empty:
        print("No records found for that commodity/state.")
        return None
    # take the latest (by Arrival_Date if present)
    if 'Arrival_Date' in df.columns:
        df['Arrival_Date'] = pd.to_datetime(df['Arrival_Date'], errors='coerce', dayfirst=True)
        df = df.sort_values('Arrival_Date', ascending=False)
    row = df.iloc[0]
    try:
        modal = float(row.get('Modal_Price') or row.get('modal_price') or 0)
    except:
        modal = 0
    return modal, row

def apply_grade(modal_price, grade):
    # simple multipliers (example)
    grade = grade.upper()
    if grade == 'A': return modal_price * 1.05
    if grade == 'B': return modal_price * 1.00
    return modal_price * 0.85

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--commodity", required=True)
    p.add_argument("--state", help="optional state filter")
    p.add_argument("--grade", default="B")
    args = p.parse_args()

    res = find_price(args.commodity, args.state)
    if res:
        modal, row = res
        final = apply_grade(modal, args.grade)
        print("Base modal price:", modal)
        print("Suggested price for grade", args.grade, ":", round(final,2))
        print("Source market:", row.get('Market'), "| Arrival_Date:", row.get('Arrival_Date'))
