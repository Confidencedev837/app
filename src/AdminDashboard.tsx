import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './context/AdminContext';
import { useNavigate } from 'react-router-dom';
// import { Bar } from 'react-chartjs-2';
import FloatingActionButton from './components/FloatingActionButton';

const fetchDashboardData = async () => {
  try {
    return {
      visits: 1234,
      productClicks: 567,
      leads: 89,
      sales: [
        {
          productId: '1',
          customers: [
            { name: 'John Doe', email: 'john@example.com' },
            { name: 'Jane Smith', email: 'jane@example.com' },
          ],
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return null;
  }
};

const AdminDashboard: React.FC = () => {
  const { isAdmin, } = useContext(AdminContext);
  const navigate = useNavigate();
  const [ setDashboardData] = useState<any>(null);
  const [days, ] = useState(30);

  useEffect(() => {
    if (!isAdmin) navigate('/admin/login');
  }, [isAdmin, navigate]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDashboardData();
      setDashboardData(data);
    };
    loadData();
  }, [days]);

  // const chartData = {
  //   labels: ['Visits', 'Product Clicks', 'Leads'],
  //   datasets: [
  //     {
  //       label: 'Metrics',
  //       data: dashboardData ? [dashboardData.visits, dashboardData.productClicks, dashboardData.leads] : [],
  //       backgroundColor: ['rgba(75,192,192,0.8)', 'rgba(153,102,255,0.8)', 'rgba(255,159,64,0.8)'],
  //     },
  //   ],
  // };

  return (
    <div className="admin-dashboard">
     
      <FloatingActionButton />
    </div>
  );
};

export default AdminDashboard;