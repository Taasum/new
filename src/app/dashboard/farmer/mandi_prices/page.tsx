"use client";

import { useState } from "react";

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

export default function MandiPricesPage() {
  const [data] = useState<MandiRow[]>([
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "21/03/2006", Min_Price: "2862", Max_Price: "3030", Modal_Price: "2862", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "25/03/2006", Min_Price: "2275", Max_Price: "2971", Modal_Price: "2900", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "10/04/2006", Min_Price: "3046", Max_Price: "3321", Modal_Price: "3211", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "13/04/2006", Min_Price: "3221", Max_Price: "3411", Modal_Price: "3221", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "25/04/2006", Min_Price: "3201", Max_Price: "3201", Modal_Price: "3201", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "08/05/2006", Min_Price: "2891", Max_Price: "3100", Modal_Price: "3000", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "15/05/2006", Min_Price: "2900", Max_Price: "3075", Modal_Price: "3050", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "17/05/2006", Min_Price: "3305", Max_Price: "3305", Modal_Price: "3305", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "29/05/2006", Min_Price: "2900", Max_Price: "2951", Modal_Price: "2951", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "01/06/2006", Min_Price: "2875", Max_Price: "3252", Modal_Price: "3111", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "14/06/2006", Min_Price: "2999", Max_Price: "2999", Modal_Price: "2999", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "24/06/2006", Min_Price: "3000", Max_Price: "3000", Modal_Price: "3000", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "01/07/2006", Min_Price: "2800", Max_Price: "2800", Modal_Price: "2800", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "08/07/2006", Min_Price: "2096", Max_Price: "2501", Modal_Price: "2501", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "17/07/2006", Min_Price: "2262", Max_Price: "2262", Modal_Price: "2262", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "19/07/2006", Min_Price: "2500", Max_Price: "3011", Modal_Price: "3011", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "27/07/2006", Min_Price: "2375", Max_Price: "2771", Modal_Price: "2771", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "31/07/2006", Min_Price: "2011", Max_Price: "2951", Modal_Price: "2490", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "01/08/2006", Min_Price: "2920", Max_Price: "2920", Modal_Price: "2920", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "19/09/2006", Min_Price: "3251", Max_Price: "3251", Modal_Price: "3251", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "07/11/2006", Min_Price: "3131", Max_Price: "3200", Modal_Price: "3200", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "27/11/2006", Min_Price: "3126", Max_Price: "3451", Modal_Price: "3370", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "28/11/2006", Min_Price: "3100", Max_Price: "3351", Modal_Price: "3276", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "16/12/2006", Min_Price: "3153", Max_Price: "3211", Modal_Price: "3159", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "20/12/2006", Min_Price: "2812", Max_Price: "3303", Modal_Price: "3200", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Malegaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "28/12/2006", Min_Price: "2890", Max_Price: "3160", Modal_Price: "3100", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Nandgaon", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "02/12/2006", Min_Price: "2500", Max_Price: "3291", Modal_Price: "3280", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "04/01/2006", Min_Price: "2300", Max_Price: "2401", Modal_Price: "2375", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "05/02/2006", Min_Price: "2300", Max_Price: "2411", Modal_Price: "2400", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "06/02/2006", Min_Price: "2367", Max_Price: "2400", Modal_Price: "2375", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "20/02/2006", Min_Price: "2551", Max_Price: "2620", Modal_Price: "2575", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "01/03/2006", Min_Price: "2250", Max_Price: "2786", Modal_Price: "2750", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "09/03/2006", Min_Price: "2551", Max_Price: "2650", Modal_Price: "2600", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "03/04/2006", Min_Price: "3175", Max_Price: "3300", Modal_Price: "3200", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "10/04/2006", Min_Price: "3101", Max_Price: "3242", Modal_Price: "3200", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "17/04/2006", Min_Price: "3100", Max_Price: "3201", Modal_Price: "3150", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "24/04/2006", Min_Price: "2900", Max_Price: "3199", Modal_Price: "3100", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "26/04/2006", Min_Price: "2000", Max_Price: "3175", Modal_Price: "3100", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "30/04/2006", Min_Price: "2500", Max_Price: "3081", Modal_Price: "3000", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "10/05/2006", Min_Price: "3000", Max_Price: "3100", Modal_Price: "3050", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "29/05/2006", Min_Price: "2900", Max_Price: "3076", Modal_Price: "3000", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "04/06/2006", Min_Price: "2900", Max_Price: "2900", Modal_Price: "2900", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "11/06/2006", Min_Price: "2000", Max_Price: "2931", Modal_Price: "2700", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "20/09/2006", Min_Price: "3580", Max_Price: "3580", Modal_Price: "3580", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Nashik", Market: "Sinner", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "06/11/2006", Min_Price: "3522", Max_Price: "3522", Modal_Price: "3522", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Parbhani", Market: "Jintur", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "28/02/2006", Min_Price: "1701", Max_Price: "1701", Modal_Price: "1701", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Parbhani", Market: "Jintur", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "10/03/2006", Min_Price: "2200", Max_Price: "2200", Modal_Price: "2200", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Pune", Market: "Indapur", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "19/01/2006", Min_Price: "2575", Max_Price: "2575", Modal_Price: "2575", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Pune", Market: "Indapur", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "03/08/2006", Min_Price: "3000", Max_Price: "3000", Modal_Price: "3000", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Pune", Market: "Indapur", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "28/12/2006", Min_Price: "3000", Max_Price: "3200", Modal_Price: "3100", Commodity_Code: "93" },
    { State: "Maharashtra", District: "Pune", Market: "Indapur(Bhigwan)", Commodity: "Mataki", Variety: "Other", Grade: "FAQ", Arrival_Date: "15/01/2006", Min_Price: "2400", Max_Price: "2400", Modal_Price: "2400", Commodity_Code: "93" }
  ]);

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
}
