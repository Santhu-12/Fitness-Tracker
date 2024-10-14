import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { database } from "../../firebase/firebase";
import { ref, onValue, set } from "firebase/database";
import { useAuth } from "../../contexts/authContext";

const WaterIntakeTracker = () => {
  const { currentUser } = useAuth();
  const [waterIntake, setWaterIntake] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [waterIntakeData, setWaterIntakeData] = useState([]);
  const [view, setView] = useState("weekly");
  const [chartData, setChartData] = useState({ categories: [], series: [] });

  const generateChartData = (data) => {
    const today = new Date();
    const filteredData = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      return view === "weekly"
        ? (today - entryDate) / (1000 * 60 * 60 * 24) <= 30 // Last 30 days for weekly view
        : entryDate.getFullYear() === today.getFullYear(); // Current year for monthly view
    });

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

    const categories = Object.keys(groupedData);
    const series = [
      {
        name: "Water Intake (L)",
        data: categories.map((cat) => groupedData[cat] || 0),
      },
    ];

    return { categories, series };
  };

  useEffect(() => {
    if (currentUser) {
      const userWaterIntakeRef = ref(
        database,
        `waterIntake/${currentUser.uid}`
      );
      onValue(userWaterIntakeRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.entries(data).map(([date, amount]) => ({
            date,
            amount,
          }));
          setWaterIntakeData(formattedData);
          const newChartData = generateChartData(formattedData);
          setChartData(newChartData);
        } else {
          setWaterIntakeData([]);
          setChartData({ categories: [], series: [] });
        }
      });
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (waterIntake && selectedDate && currentUser) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      const userWaterIntakeRef = ref(
        database,
        `waterIntake/${currentUser.uid}/${dateKey}`
      );
      set(userWaterIntakeRef, Number(waterIntake)).then(() => {
        setWaterIntakeData((prevData) => [
          ...prevData,
          {
            date: dateKey,
            amount: Number(waterIntake),
          },
        ]);
        const newChartData = generateChartData([
          ...waterIntakeData,
          { date: dateKey, amount: Number(waterIntake) },
        ]);
        setChartData(newChartData);
      });
      setWaterIntake("");
    }
  };

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
            onChange={(e) => {
              setView(e.target.value);
              const newChartData = generateChartData(waterIntakeData);
              setChartData(newChartData);
            }}
            className="rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

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
              categories:
                chartData.categories.length > 0
                  ? chartData.categories
                  : ["No Data"],
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
          series={
            chartData.series.length > 0
              ? chartData.series
              : [{ name: "Water Intake (L)", data: [0] }]
          }
          type="bar"
          height={335}
        />
      </div>
    </div>
  );
};

export default WaterIntakeTracker;
