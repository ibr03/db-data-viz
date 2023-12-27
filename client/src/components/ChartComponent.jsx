import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Chart as ChartJS,
  CategoryScale, 
  LinearScale, 
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController 
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const ChartComponent = () => {
  const [chartData, setChartData] = useState({ combined: { datasets: [] } });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://db-data-viz.onrender.com/api/data-visualization');
        const data = response.data;

        // Check if data is empty or undefined
        if (!data || data.length === 0) {
          console.error('No data received for data visualization.');
          return;
        }

        // Prepare data for chart
        const labels = data.map((item) => item.phase);
        const combinedData = data.map((item) => item.count);

        const combinedChartData = {
          labels: labels,
          datasets: [
            {
              label: 'Bar Plot',
              type: 'bar',
              data: combinedData,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
            {
              label: 'Line Plot',
              type: 'line',
              data: combinedData,
              fill: false,
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(255,99,132,1)',
            }
          ],
        };

        setChartData({ combined: combinedChartData });
      } catch (error) {
        console.error('Error fetching data for data visualization:', error);
      }
    };

    fetchData();
  }, []);

  // Check if chartData is undefined before accessing its properties
  if (!chartData.combined.datasets || chartData.combined.datasets.length === 0) {
    return <div>Loading...</div>; // or another fallback UI
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>Data Visualization</h1>
      <div style={{position: 'relative', height:'40vh', width:'80vw'}}>
        <Chart 
          type='bar' 
          data={chartData.combined}
          options={{ maintainAspectRatio: false }} 
        />
      </div>
    </div>
  );
};

export default ChartComponent;
