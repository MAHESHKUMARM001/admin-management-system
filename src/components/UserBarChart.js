import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement  // Import ArcElement for compatibility
} from 'chart.js';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const UserBarChart = () => {
  const [chartData, setChartData] = useState({});  // For chart data
  const [loading, setLoading] = useState(true);    // Loading state
  const [error, setError] = useState(null);        // Error state

  // Fetch data from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users') // Example API
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Process the data to extract cities and user counts
        const cities = [];
        const cityUserCounts = {};

        data.forEach(user => {
          const city = user.address.city;
          if (cityUserCounts[city]) {
            cityUserCounts[city] += 1;
          } else {
            cityUserCounts[city] = 1;
            cities.push(city);
          }
        });

        // Prepare data for the chart
        setChartData({
          labels: cities, // Cities as labels
          datasets: [
            {
              label: 'Number of Users',
              data: cities.map(city => cityUserCounts[city]), // Count of users in each city
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
        setLoading(false);  // Set loading to false
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Display loading, error, or chart
  return (
    <div>
      {loading && <p>Loading chart...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Users by City',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default UserBarChart;
