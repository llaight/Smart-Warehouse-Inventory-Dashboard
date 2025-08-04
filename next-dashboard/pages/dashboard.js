import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Dashboard = ({ data }) => {
  // Debug logs
  console.log("📊 Chart Labels:", data.map(d => new Date(d.last_scanned).toLocaleString()));
  console.log("📦 Quantities:", data.map(d => d.quantity));

  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ padding: "2rem" }}>⚠️ No inventory data available.</p>;
  }

  const chartData = {
    labels: data.map(d => new Date(d.last_scanned).toLocaleString()),
    datasets: [
      {
        label: 'Quantity Over Time',
        data: data.map(d => d.quantity),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Scan Time'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity'
        }
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>📦 Smart Warehouse Inventory Dashboard</h1>

      {/* Line Chart */}
      <Line data={chartData} options={options} />

      {/* Metabase iframe embed */}
      <div style={{ marginTop: '3rem' }}>
        <h3>📊 Detailed Analytics (Metabase)</h3>
        <iframe
          src="http://localhost:3000/public/dashboard/acf08966-126a-4a42-a94e-ea906af9e123"
          frameBorder="0"
          width="100%"
          height="600"
          allowFullScreen
          title="Metabase Dashboard"
        ></iframe>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
//   try {
//     const res = await fetch('http://localhost:8000/api/inventory');
//     const json = await res.json();

//     // ✅ Server-side terminal logs
//     console.log("📥 Raw API response from Laravel:", JSON.stringify(json, null, 2));

//     const data = Array.isArray(json.data) ? json.data : [];

//     return { props: { data } };
//   } catch (error) {
//     console.error('❌ Error fetching inventory data:', error);
//     return { props: { data: [] } };
//   }

    const res = await fetch('http://localhost:8000/api/inventory');
    const json = await res.json();

    console.log("📥 Raw API response from Laravel:", JSON.stringify(json, null, 2));

    const data = Array.isArray(json.inventory) ? json.inventory : [];

    return { props: { data } };
}

export default Dashboard;