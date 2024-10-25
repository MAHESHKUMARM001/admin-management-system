import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const UserLineGraph = () => {
  const [graphData, setGraphData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const ids = [];
        const companyUserCounts = {};

        data.forEach(user => {
          const company = user.company.name;
          const id = user.id;
          if (companyUserCounts[company]) {
            companyUserCounts[company] += 1;
          } else {
            companyUserCounts[company] = 1;
          }
          ids.push(id);
        });

        setGraphData({
          labels: ids, // User IDs
          datasets: [
            {
              label: 'Users by Company (Line Graph)',
              data: Object.values(companyUserCounts), // Users count per company
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <p>Loading graph...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <Line
          data={graphData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Users by Company (Line Graph)',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'User IDs',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Users',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default UserLineGraph;
