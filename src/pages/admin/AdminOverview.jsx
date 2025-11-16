import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Users, Package, DollarSign, CheckCircle } from "lucide-react";

const AdminOverview = () => {
  // Summary mock data
  const summary = {
    users: 245,
    orders: 128,
    delivered: 102,
    revenue: 185000,
  };

  // Monthly revenue chart
  const monthlyRevenue = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 14000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 20000 },
    { month: "May", revenue: 15000 },
    { month: "Jun", revenue: 22000 },
    { month: "Jul", revenue: 19500 },
    { month: "Aug", revenue: 24000 },
    { month: "Sep", revenue: 26000 },
    { month: "Oct", revenue: 28000 },
    { month: "Nov", revenue: 30000 },
    { month: "Dec", revenue: 31000 },
  ];

  // Orders by category pie chart
  const ordersByCategory = [
    { name: "Scented", value: 45 },
    { name: "Decorative", value: 30 },
    { name: "Seasonal", value: 25 },
  ];

  const COLORS = ["#f59e0b", "#f97316", "#84cc16"];

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold text-amber-700">Admin Overview Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <Users className="text-blue-500" size={36} />
          <div>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{summary.users}</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <Package className="text-purple-500" size={36} />
          <div>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{summary.orders}</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <CheckCircle className="text-green-500" size={36} />
          <div>
            <p className="text-gray-600 text-sm">Delivered Orders</p>
            <p className="text-2xl font-bold text-gray-800">{summary.delivered}</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-amber-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <DollarSign className="text-amber-500" size={36} />
          <div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800">
              ₹{summary.revenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
          <h2 className="text-lg font-semibold text-amber-700 mb-4">
            Monthly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by Category Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
          <h2 className="text-lg font-semibold text-amber-700 mb-4">
            Orders by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ordersByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {ordersByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
