import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from './context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import FloatingActionButton from './components/FloatingActionButton';

// Dummy dashboard data function – replace with your Appwrite queries if desired.
const fetchDashboardData = async () => {
  return {
    visits: 1234,
    productClicks: 567,
    leads: 89,
    sales: [
      {
        productId: '1',
        customers: [
          { name: 'John Doe', email: 'john@example.com' },
          { name: 'Jane Smith', email: 'jane@example.com' }
        ]
      }
    ]
  };
};

const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useContext(AdminContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    // if (!isAdmin) navigate('/admin/login');
  }, [isAdmin, navigate]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchDashboardData();
      setDashboardData(data);
    };
    loadData();
  }, [days]);

  const chartData = {
    labels: ['Visits', 'Product Clicks', 'Leads'],
    datasets: [
      {
        label: 'Metrics',
        data: dashboardData ? [dashboardData.visits, dashboardData.productClicks, dashboardData.leads] : [],
        backgroundColor: ['rgba(75,192,192,0.8)', 'rgba(153,102,255,0.8)', 'rgba(255,159,64,0.8)']
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={logout} className="logout-btn">Logout</button>
      <div className="dashboard-controls">
        <label>Select Period: </label>
        <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={30}>30 Days</option>
          <option value={60}>60 Days</option>
          <option value={90}>90 Days</option>
        </select>
      </div>
      {dashboardData ? (
        <>
          <Bar data={chartData} />
          <div className="sales-data">
            <h3>Sales Data</h3>
            {dashboardData.sales.map((sale: any, index: number) => (
              <div key={index} className="sale-item">
                <p><strong>Product ID:</strong> {sale.productId}</p>
                <ul>
                  {sale.customers.map((customer: any, idx: number) => (
                    <li key={idx}>{customer.name} - {customer.email}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading dashboard data...</p>
      )}
      <FloatingActionButton />
    </div>
  );
};

export default AdminDashboard;
