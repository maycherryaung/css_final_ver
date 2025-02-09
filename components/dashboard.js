"use client";  // Add this line at the very top

import React, { useEffect, useState, useRef, forwardRef } from "react";
import Chart from "chart.js/auto";

// Main Home Component that renders the Dashboard
export default function Home() {
  return (
    <main>
      <CovidDashboard />
    </main>
  );
}

// CovidDashboard Component
const CovidDashboard = () => {
  // States for current data, historical data, and countries list
  const [covidData, setCovidData] = useState({ cases: 0, deaths: 0, recovered: 0, critical: 0 });
  const [historicalData, setHistoricalData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("global");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Refs for chart canvases and chart instances
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartInstance = useRef(null);
  const pieChartInstance = useRef(null);
  const lineChartInstance = useRef(null);

  // Fetch COVID-19 summary data
  const fetchCovidData = async (region) => {
    setLoading(true);
    setError(null);
    const url =
      region === "global"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${region}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching data: ${response.status}`);
      const data = await response.json();
      setCovidData(data);
    } catch (err) {
      console.error("Error fetching COVID data:", err);
      setError("Failed to fetch COVID data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch historical COVID-19 data (last 30 days)
  const fetchHistoricalData = async (region) => {
    setError(null);
    const url =
      region === "global"
        ? "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
        : `https://disease.sh/v3/covid-19/historical/${region}?lastdays=30`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error fetching historical data: ${response.status}`);
      const data = await response.json();
      // For country data the timeline is nested inside the "timeline" key
      setHistoricalData(region === "global" ? data : data.timeline);
    } catch (err) {
      console.error("Error fetching historical data:", err);
      setError("Failed to fetch historical data.");
    }
  };

  // Populate countries dropdown
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      if (!response.ok) throw new Error(`Error fetching countries: ${response.status}`);
      const data = await response.json();
      setCountries(data.filter((country) => country.countryInfo.iso2));
    } catch (err) {
      console.error("Error fetching countries:", err);
      setError("Failed to fetch countries.");
    }
  };

  // Initial load
  useEffect(() => {
    fetchCovidData("global");
    fetchHistoricalData("global");
    fetchCountries();
  }, []);

  // When country selection changes, update both summary and historical data
  useEffect(() => {
    fetchCovidData(selectedCountry);
    fetchHistoricalData(selectedCountry);
  }, [selectedCountry]);

  // Render bar and pie charts when covidData or darkMode changes
  useEffect(() => {
    if (covidData) {
      renderBarChart();
      renderPieChart();
    }
    // Cleanup chart instances on unmount/update
    return () => {
      if (barChartInstance.current) barChartInstance.current.destroy();
      if (pieChartInstance.current) pieChartInstance.current.destroy();
    };
  }, [covidData, darkMode]);

  // Render line chart when historicalData or darkMode changes
  useEffect(() => {
    if (historicalData) {
      renderLineChart();
    }
    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
    };
  }, [historicalData, darkMode]);

  // Render Bar Chart using Chart.js
  const renderBarChart = () => {
    if (barChartInstance.current) barChartInstance.current.destroy();
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      barChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Cases", "Deaths", "Recovered", "Critical Cases"],
          datasets: [
            {
              label: "COVID-19 Stats",
              data: [
                covidData.cases,
                covidData.deaths,
                covidData.recovered,
                covidData.critical || 0
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)"
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
          plugins: {
            legend: { labels: { color: darkMode ? "#fff" : "#000" } },
          },
        },
      });
    }
  };

  // Render Pie Chart using Chart.js
  const renderPieChart = () => {
    if (pieChartInstance.current) pieChartInstance.current.destroy();
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext("2d");
      pieChartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Cases", "Deaths", "Recovered", "Critical Cases"],
          datasets: [
            {
              data: [
                covidData.cases,
                covidData.deaths,
                covidData.recovered,
                covidData.critical || 0
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)"
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: darkMode ? "#fff" : "#000" } },
          },
        },
      });
    }
  };

  // Render Line Chart for Historical Data (Daily New Cases)
  const renderLineChart = () => {
    if (lineChartInstance.current) lineChartInstance.current.destroy();
    if (lineChartRef.current && historicalData) {
      const ctx = lineChartRef.current.getContext("2d");
      const casesData = historicalData.cases;
      const labels = Object.keys(casesData);
      const cumulativeCases = Object.values(casesData);
      // Calculate daily new cases from cumulative totals
      const dailyNewCases = cumulativeCases.map((value, index, arr) =>
        index === 0 ? 0 : value - arr[index - 1]
      );

      lineChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Daily New Cases",
              data: dailyNewCases,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: darkMode ? "#fff" : "#000" } },
          },
          scales: {
            x: { ticks: { color: darkMode ? "#fff" : "#000" } },
            y: {
              beginAtZero: true,
              ticks: { color: darkMode ? "#fff" : "#000" },
            },
          },
        },
      });
    }
  };

  // Event Handlers
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleRefresh = () => {
    fetchCovidData(selectedCountry);
    fetchHistoricalData(selectedCountry);
  };

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    setDarkMode(!darkMode);
  };
  

  // Define theme styles based on darkMode state
  const themeStyles = {
    backgroundColor: darkMode ? "#333" : "#f9f9f9",
    color: darkMode ? "#fff" : "#000",
  };

  return (
    <div style={{ ...styles.container, ...themeStyles }}>
      <header style={{ ...styles.header, backgroundColor: darkMode ? "#444" : "#007bff" }}>
        <h1>Real-Time COVID-19 Global Statistics</h1>
        <div style={styles.controls}>
          <button style={styles.button} onClick={handleRefresh}>
            Refresh Data
          </button>
          <button style={styles.button} onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>
      <main style={styles.main}>
        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <section style={styles.statsSection}>
          <StatCard title="Total Cases" value={covidData.cases} />
          <StatCard title="Total Deaths" value={covidData.deaths} />
          <StatCard title="Total Recovered" value={covidData.recovered} />
          {covidData.active && <StatCard title="Active Cases" value={covidData.active} />}
          {covidData.critical && <StatCard title="Critical Cases" value={covidData.critical} />}
        </section>

        <select style={styles.select} value={selectedCountry} onChange={handleCountryChange}>
          <option value="global">Global</option>
          {countries.map((country) => (
            <option key={country.countryInfo.iso2} value={country.countryInfo.iso2}>
              {country.country}
            </option>
          ))}
        </select>

        {/*Informational Section */}
        <section style={styles.infoSection}>
          <p>
            <strong>Critical Cases:</strong> The definition of a 'critical' case is the development of life-threatening complications, in turn, necessitating immediate, intensive medical intervention. Critical COVID-19 disease most often involves severe respiratory distress that can develop into acute respiratory failure: a condition whereby the lungs cannot supply the body or remove carbon dioxide adequately. Thus, critically ill patients generally require the support of advanced respiratory systems: supplemental oxygen therapy, mechanical ventilation, or even highly specialized treatments such as extracorporeal membrane oxygenation, in which the blood is oxygenated outside the body when the lungs are no longer capable of doing so.
            Apart from respiratory complications, critical cases can also present with a failure of multiple organs, including acute kidney injury, heart complications, and severe coagulopathy-like conditions such as disseminated intravascular coagulation. These complications are highly risky for long-term health consequences and mortality. Therefore, the need is for quick diagnosis and intervention. The serious cases generally get admitted to the ICU, where, under continuous monitoring, antiviral medications, anti-inflammatory drugs like corticosteroids, and other supporting therapies are tried in combination.
            Some sections at higher risk of the development of critical illness are elderly patients, patients with diabetes, hypertension, cardiovascular disease, obesity, and immune-compromised conditions. This trend is related to the early medical interventions, early detection, and availability of ICU facilities and actually reflects strong health infrastructure and emergency preparedness.
          </p>

        </section>

        <section style={styles.chartsSection}>
          <ChartContainer ref={barChartRef} />
          <ChartContainer ref={pieChartRef} />
        </section>
        <section style={styles.chartsSection}>
          <div style={styles.chartContainer}>
            <canvas ref={lineChartRef}></canvas>
          </div>
        </section>
      </main>
      <footer style={{ ...styles.footer, backgroundColor: darkMode ? "#444" : "#007bff" }}>
        <p>
          &copy; 2025 World Health Organization | Data sourced from{" "}
          <a href="https://disease.sh" style={styles.footerLink}>
            disease.sh API
          </a>
        </p>
      </footer>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value }) => (
  <div style={styles.statCard}>
    <h2>{value.toLocaleString()}</h2>
    <p>{title}</p>
  </div>
);

// Chart Container Component using forwardRef
const ChartContainer = forwardRef((props, ref) => (
  <div style={styles.chartContainer}>
    <canvas ref={ref}></canvas>
  </div>
));

<p>
<strong>Country Disparities:</strong> The varying impact of COVID-19 across countries can be attributed to factors such as population density,
healthcare infrastructure, timing and strictness of public health measures, testing availability, and the prevalence of pre-existing conditions.
</p>

// Inline Styles
const styles = {
  container: {
    minHeight: "100vh",
  },
  header: {
    color: "#fff",
    textAlign: "center",
    padding: "1.5rem 0",
  },
  controls: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  statsSection: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "2rem",
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    margin: "10px",
    padding: "20px",
    flex: "1 1 250px",
    textAlign: "center",
  },
  select: {
    margin: "20px 0",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  infoSection: {
    maxWidth: "1200px",
    margin: "20px auto",
    padding: "0 20px",
    lineHeight: "1.6",
  },
  chartsSection: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "2rem",
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    margin: "10px",
    padding: "20px",
    flex: "1 1 500px",
    position: "relative",
  },
  footer: {
    color: "#fff",
    textAlign: "center",
    padding: "1rem 0",
    marginTop: "20px",
  },
  footerLink: {
    color: "#fff",
    textDecoration: "underline",
  },
};
