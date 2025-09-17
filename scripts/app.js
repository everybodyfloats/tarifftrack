const tariffs = [
  {
    market: "United States",
    hsCode: "HS 8504",
    description: "Power supplies & transformers",
    rate: "25% Section 301 duty",
    notes: "Applies to List 1 items; exclusions expired except for medical devices."
  },
  {
    market: "United States",
    hsCode: "HS 9403",
    description: "Metal furniture",
    rate: "25% Section 301 duty",
    notes: "Subject to additional 0.6% Merchandise Processing Fee (MPF)."
  },
  {
    market: "United States",
    hsCode: "HS 9503",
    description: "Toys & games",
    rate: "Most Favored Nation 3.9% + 7.5% 301 duty",
    notes: "Split shipments must declare the full entered value for 301 calculations."
  },
  {
    market: "European Union",
    hsCode: "HS 6403",
    description: "Leather footwear",
    rate: "17% MFN",
    notes: "Anti-dumping duties up to 10% may apply on specific brands."
  },
  {
    market: "European Union",
    hsCode: "HS 8544",
    description: "Wiring harnesses",
    rate: "3.7% MFN",
    notes: "Reduced to 0% with EU-China Preferential Trade documentation (Form A)."
  },
  {
    market: "European Union",
    hsCode: "HS 9401",
    description: "Seating (non-upholstered)",
    rate: "5.6% MFN",
    notes: "Ensure REACH compliance certificates for polymer components."
  },
  {
    market: "Canada",
    hsCode: "HS 4202",
    description: "Travel bags & luggage",
    rate: "8% MFN",
    notes: "Qualify for CPTPP 0% if 45% regional value content threshold met."
  },
  {
    market: "Canada",
    hsCode: "HS 8509",
    description: "Household appliances",
    rate: "Most items 0% MFN",
    notes: "Mandatory Energy Efficiency Act declarations for electric motors."
  },
  {
    market: "Australia",
    hsCode: "HS 9506",
    description: "Fitness equipment",
    rate: "0% ChAFTA",
    notes: "Importer must retain certificate of origin issued by CCPIT."
  },
  {
    market: "Australia",
    hsCode: "HS 7308",
    description: "Structures of iron or steel",
    rate: "5% MFN",
    notes: "Large projects may require foreign investment review approvals."
  }
];

const shippingBenchmarks = [
  {
    mode: "Ocean Freight",
    route: "Shanghai → Los Angeles (US West Coast)",
    transitTime: "18 – 20 days",
    frequency: "Weekly mainline services",
    reliability: "On-time reliability ~64%",
    notes: "Allow 5-7 days for terminal handling and customs clearance."
  },
  {
    mode: "Ocean Freight",
    route: "Ningbo → Rotterdam (EU NL)",
    transitTime: "28 – 32 days",
    frequency: "Multiple weekly sailings via Singapore",
    reliability: "On-time reliability ~58%",
    notes: "Congestion at Rotterdam may add 3-4 days dwell in peak season."
  },
  {
    mode: "Ocean Freight",
    route: "Yantian → Sydney (Australia)",
    transitTime: "14 – 17 days",
    frequency: "Direct weekly loop",
    reliability: "On-time reliability ~71%",
    notes: "Biosecurity inspection adds 2-3 days if container selected."
  },
  {
    mode: "Air Freight",
    route: "Shanghai PVG → Chicago ORD",
    transitTime: "3 – 5 days",
    frequency: "Daily freighter & passenger belly",
    reliability: "On-time reliability ~82%",
    notes: "High season surcharges between September and January."
  },
  {
    mode: "Air Freight",
    route: "Shenzhen SZX → Frankfurt FRA",
    transitTime: "2 – 4 days",
    frequency: "6x weekly express services",
    reliability: "On-time reliability ~85%",
    notes: "Book space 7-10 days ahead to avoid rollovers."
  },
  {
    mode: "Rail Freight",
    route: "Chengdu → Lodz (Poland)",
    transitTime: "16 – 19 days",
    frequency: "Three departures per week",
    reliability: "On-time reliability ~74%",
    notes: "Best for electronics & automotive components under 10 tons per container."
  },
  {
    mode: "Rail Freight",
    route: "Xi'an → Duisburg (Germany)",
    transitTime: "18 – 21 days",
    frequency: "Four departures per week",
    reliability: "On-time reliability ~77%",
    notes: "Include 2-3 days for transloading at the Belarus/Poland border."
  }
];

const marketSelect = document.getElementById("market-select");
const tariffBody = document.getElementById("tariff-table-body");
const modeSelect = document.getElementById("mode-select");
const shippingCards = document.getElementById("shipping-cards");

function setSelectOptions(selectElement, options) {
  selectElement.innerHTML = "";
  options.forEach((option) => {
    const el = document.createElement("option");
    el.value = option;
    el.textContent = option;
    selectElement.appendChild(el);
  });
}

function renderTariffs(market) {
  const filtered = tariffs.filter((row) => row.market === market);
  tariffBody.innerHTML = "";

  if (filtered.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No tariff data available for the selected market.";
    row.appendChild(cell);
    tariffBody.appendChild(row);
    return;
  }

  filtered.forEach((row) => {
    const tr = document.createElement("tr");

    [row.hsCode, row.description, row.rate, row.notes].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });

    tariffBody.appendChild(tr);
  });
}

function renderShippingCards(mode) {
  const filtered = shippingBenchmarks.filter((item) => item.mode === mode);
  shippingCards.innerHTML = "";

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No shipping benchmarks available for the selected mode.";
    shippingCards.appendChild(empty);
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "shipping-card";
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      <h3>${item.route}</h3>
      <dl>
        <div>
          <dt>Transit time</dt>
          <dd>${item.transitTime}</dd>
        </div>
        <div>
          <dt>Service frequency</dt>
          <dd>${item.frequency}</dd>
        </div>
        <div>
          <dt>Schedule reliability</dt>
          <dd>${item.reliability}</dd>
        </div>
      </dl>
      <p class="card-note">${item.notes}</p>
    `;

    shippingCards.appendChild(card);
  });
}

function initialize() {
  const markets = Array.from(new Set(tariffs.map((row) => row.market)));
  const modes = Array.from(new Set(shippingBenchmarks.map((item) => item.mode)));

  setSelectOptions(marketSelect, markets);
  setSelectOptions(modeSelect, modes);

  renderTariffs(markets[0]);
  renderShippingCards(modes[0]);
}

marketSelect.addEventListener("change", (event) => {
  renderTariffs(event.target.value);
});

modeSelect.addEventListener("change", (event) => {
  renderShippingCards(event.target.value);
});

initialize();
