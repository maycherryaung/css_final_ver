/* pages/maychart.jsx */

import CovidLineChart from "../components/CovidLineChart";
import CovidHospitalChart from "../components/CovidHospitalChart";
import styles from "../styles/Chart.module.css";

export default function HomePage() {
  return (
    <main className={`p-6 space-y-12 ${styles.container}`}>
      <div className="max-w-screen-lg mx-auto px-4">
        <section className="chart-container">
          <CovidLineChart />
        </section>
        <section className="chart-container">
          <CovidHospitalChart />
        </section>
      </div>
    </main>
  );
}
