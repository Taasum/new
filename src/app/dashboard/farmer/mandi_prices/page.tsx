// app/dashboard/farmer/mandi_prices/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Papa from "papaparse";

interface MandiRow {
  State: string;
  District: string;
  Market: string;
  Commodity: string;
  Variety: string;
  Grade: string;
  Arrival_Date: string;
  Min_Price: string;
  Max_Price: string;
  Modal_Price: string;
  Commodity_Code: string;
}

const MandiPricesPage: React.FC = () => {
  const [data, setData] = useState<MandiRow[]>([]);

  useEffect(() => {
    fetch("/mandi_today_2025-09-19.csv") // must be in public folder
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse<MandiRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => setData(results.data),
        });
      })
      .catch((err) => console.error("CSV fetch error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Mandi Prices</h1>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>State</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>District</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Market</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Commodity</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Variety</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Grade</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Arrival Date</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Min Price</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Max Price</th>
              <th style={{ padding: "10px", border: "1px solid #ccc" }}>Modal Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} style={{ textAlign: "center" }}>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.State}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.District}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Market}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Commodity}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Variety}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Grade}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Arrival_Date}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Min_Price}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Max_Price}</td>
                <td style={{ padding: "8px", border: "1px solid #ccc" }}>{row.Modal_Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MandiPricesPage;
