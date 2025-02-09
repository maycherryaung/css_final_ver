//CovidLineChart.jsx //May Cherry Aung, S10269732

"use client";

import { downloadCSV } from "../utils/exportData";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchVaccinationData } from "../utils/api";
import { format } from "date-fns";

export default function VaccinationLineChart() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const getData = async () => {
      const vaccinationData = await fetchVaccinationData();
      if (vaccinationData) {
        setData(vaccinationData);
        setFilteredData(vaccinationData);
        const months = [
          ...new Set(
            vaccinationData.map((item) =>
              format(new Date(item.date), "yyyy-MM")
            )
          ),
        ];
        setAvailableMonths(months);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = data.filter(
        (item) => format(new Date(item.date), "yyyy-MM") === selectedMonth
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth, data]);

  const getDescription = () => {
    if (selectedOption === "all") {
      return "This graph displays the progress of COVID-19 vaccination in Singapore, showing three metrics: the number of individuals who have received at least one dose, those who have completed the full regimen, and those who have achieved minimum protection.";
    } else if (selectedOption === "atLeastOne") {
      return "The line graph showcases the cumulative number of people who have received at least one dose of the vaccine over time.";
    } else if (selectedOption === "fullRegimen") {
      return "The line graph highlights the number of people who have completed the Full Regimen of vaccination.";
    } else if (selectedOption === "minimumProtection") {
      return "This graph illustrates the trend of COVID-19 vaccinations in Singapore by focusing on the number of individuals who have achieved minimum protection.";
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">
          Progress of COVID-19 vaccination in Singapore
        </h1>
        <div className="mb-4">
          <label htmlFor="line-select" className="mr-2">
            Select data to display:
          </label>
          <select
            id="line-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="atLeastOne">At Least One Dose</option>
            <option value="fullRegimen">Full Regimen</option>
            <option value="minimumProtection">Minimum Protection</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="month-filter" className="mr-2">
            Filter by Month:
          </label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Months</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), "MMM dd, yyyy")}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) =>
                format(new Date(date), "MMMM dd, yyyy")
              }
            />
            <Legend />
            {(selectedOption === "all" || selectedOption === "atLeastOne") && (
              <Line
                type="monotone"
                dataKey="received_at_least_one_dose"
                stroke="#6a0dad"
                name="At Least One Dose"
                strokeWidth={2}
              />
            )}
            {(selectedOption === "all" || selectedOption === "fullRegimen") && (
              <Line
                type="monotone"
                dataKey="full_regimen"
                stroke="#1e90ff"
                name="Full Regimen"
                strokeWidth={2}
              />
            )}
            {(selectedOption === "all" || selectedOption === "minimumProtection") && (
              <Line
                type="monotone"
                dataKey="minimum_protection"
                stroke="#ff4500"
                name="Minimum Protection"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <p className="text-gray-700 mt-4">{getDescription()}</p>
        <button
          onClick={() => downloadCSV(filteredData, "Vaccination_Data")}
          className="btn mt-4"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
}