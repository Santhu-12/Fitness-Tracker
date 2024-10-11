import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WaterIntakeTracker = () => {
  const [waterIntake, setWaterIntake] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [waterIntakeData, setWaterIntakeData] = useState([
    { date: "2024-01-01", amount: 1.0 }, // 1000 ml
    { date: "2024-01-02", amount: 0.9 }, // 900 ml
    { date: "2024-01-03", amount: 0.8 }, // 800 ml
    { date: "2024-01-04", amount: 0.6 }, // 600 ml
    { date: "2024-01-05", amount: 1.0 }, // 1000 ml
    { date: "2024-01-06", amount: 0.7 }, // 700 ml
    { date: "2024-01-07", amount: 0.5 }, // 500 ml
    { date: "2024-02-01", amount: 1.2 }, // 1200 ml
    { date: "2024-02-02", amount: 0.6 }, // 600 ml
    { date: "2024-02-03", amount: 0.5 }, // 500 ml
    { date: "2024-02-04", amount: 0.9 }, // 900 ml
    { date: "2024-03-01", amount: 1.0 }, // 1000 ml
    { date: "2024-03-02", amount: 0.8 }, // 800 ml
    { date: "2024-03-03", amount: 0.7 }, // 700 ml
    { date: "2024-03-04", amount: 0.5 }, // 500 ml
    { date: "2024-04-01", amount: 0.5 }, // 500 ml
    { date: "2024-04-02", amount: 1.1 }, // 1100 ml
    { date: "2024-04-03", amount: 0.6 }, // 600 ml
    { date: "2024-04-04", amount: 0.8 }, // 800 ml
    { date: "2024-05-01", amount: 1.0 }, // 1000 ml
    { date: "2024-05-02", amount: 0.9 }, // 900 ml
    { date: "2024-05-03", amount: 1.0 }, // 1000 ml
    { date: "2024-06-01", amount: 1.2 }, // 1200 ml
    { date: "2024-06-02", amount: 1.0 }, // 1000 ml
    { date: "2024-06-03", amount: 0.5 }, // 500 ml
    { date: "2024-07-01", amount: 0.8 }, // 800 ml
    { date: "2024-07-02", amount: 0.9 }, // 900 ml
    { date: "2024-08-01", amount: 0.7 }, // 700 ml
    { date: "2024-08-02", amount: 1.0 }, // 1000 ml
    { date: "2024-09-01", amount: 0.8 }, // 800 ml
    { date: "2024-09-02", amount: 0.7 }, // 700 ml
  ]);

  const [view, setView] = useState("weekly"); // 'weekly' or 'monthly'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (waterIntake && selectedDate) {
      setWaterIntakeData([
        ...waterIntakeData,
        {
          date: selectedDate.toISOString().split("T")[0],
          amount: Number(waterIntake).toFixed(1),
        },
      ]);
      setWaterIntake("");
    }
  };

  const getFilteredData = () => {
    const today = new Date();
    return waterIntakeData.filter((entry) => {
      const entryDate = new Date(entry.date);
      return view === "weekly"
        ? (today - entryDate) / (1000 * 60 * 60 * 24) <= 30 // Filter for the last 30 days for weekly view
        : entryDate.getFullYear() === today.getFullYear(); // Filter for the current year for monthly view
    });
  };

  const generateChartData = () => {
    const filteredData = getFilteredData();
    const groupedData = {};

    filteredData.forEach((entry) => {
      const dateStr =
        view === "weekly"
          ? new Date(entry.date).toLocaleDateString("en-US", {
              weekday: "short",
            })
          : new Date(entry.date).toLocaleDateString("en-US", {
              month: "short",
            });

      groupedData[dateStr] = (groupedData[dateStr] || 0) + entry.amount;
    });

    const labels = Object.keys(groupedData);
    const data = Object.values(groupedData);

    return {
      categories: labels.length > 0 ? labels : ["No Data"],
      series: [
        {
          name: "Water Intake (L)",
          data: data.length > 0 ? data : [0],
        },
      ],
    };
  };

  const chartData = generateChartData();

  return (
    <div className="container mx-auto p-5">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-7">
        <h3 className="font-medium text-black dark:text-white mb-6">
          Water Intake Tracker
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Water Intake (L)
            </label>
            <input
              type="number"
              step="0.1"
              value={waterIntake}
              onChange={(e) => setWaterIntake(e.target.value)}
              placeholder="Enter water intake in liters"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              required
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Add Water Intake
          </button>
        </form>

        <div className="mt-5">
          <label className="mb-2 block text-black dark:text-white">View:</label>
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-8 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-7">
        <h3 className="font-medium text-black dark:text-white mb-6">
          Water Intake - Last {view === "weekly" ? "30 Days" : "Year"}
        </h3>
        <ReactApexChart
          options={{
            colors: ["#3C50E0"],
            chart: {
              fontFamily: "Satoshi, sans-serif",
              type: "bar",
              height: 335,
              stacked: true,
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 0,
                columnWidth: "25%",
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: chartData.categories,
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              fontFamily: "Satoshi, sans-serif",
            },
            yaxis: {
              title: {
                text: "Water Intake (L)",
              },
              labels: {
                formatter: function (val) {
                  return parseFloat(val).toFixed(1);
                },
              },
            },
          }}
          series={chartData.series}
          type="bar"
          height={335}
        />
      </div>
    </div>
  );
};

export default WaterIntakeTracker;
