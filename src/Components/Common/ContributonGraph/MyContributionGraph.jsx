import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './MyContribution.css'



const MyContributionGraph = () => {
  const values = [
    { date: '2023-08-01', count: 1 },
    { date: '2023-08-02', count: 4 },
    { date: '2023-08-03', count: 2 },
    // Add more data here
  ];

  return (

    <div className='Contribution'>
        <h1>Activity</h1>
        <div className='Contribution-graph'>
        
        <CalendarHeatmap
          startDate={new Date('2023-01-01')}
          endDate={new Date('2023-12-31')}
          values={values}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${value.count}`;
          }}
        />

        </div>
    </div>
    
  );
};

export default MyContributionGraph;
