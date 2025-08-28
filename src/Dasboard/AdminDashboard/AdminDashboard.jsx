import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserFriends, FaBoxOpen, FaShoppingCart, FaDollarSign, FaChartLine } from "react-icons/fa";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch users (customers)
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/customers");
      return res.data;
    },
  });

  // Fetch products
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // Fetch orders
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  // Calculate totals
  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = orders.length;

  // Total sales amount
  const totalSales = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Calculate growths (example placeholders)
  const userGrowth = ((totalUsers / 1000) * 10).toFixed(2);
  const productGrowth = ((totalProducts / 500) * 5).toFixed(2);
  const orderGrowth = ((totalOrders / 800) * 7).toFixed(2);
  const salesGrowth = ((totalSales / 100000) * 8).toFixed(2);
  const overallGrowth = (
    (parseFloat(userGrowth) + parseFloat(productGrowth) + parseFloat(orderGrowth) + parseFloat(salesGrowth)) /
    4
  ).toFixed(2);

  // Monthly orders line chart data
  const monthlyOrders = orders.reduce((acc, order) => {
    // Assuming order.date is ISO string: '2023-07-22T...'
    const month = order.date?.substring(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = Object.entries(monthlyOrders)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month, count }));

  // Sales by category pie chart data
  // Aggregate sales by product category
  const salesByCategoryMap = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const category = item.category || "Uncategorized";
      salesByCategoryMap[category] = (salesByCategoryMap[category] || 0) + item.price * item.quantity;
    });
  });

  const pieData = Object.entries(salesByCategoryMap).map(([category, value]) => ({
    name: category,
    value: value.toFixed(2),
  }));

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#FF6699", "#33CC99"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user.displayName}</h1>
        <p className="text-gray-600">Manage and track your e-commerce store's performance.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaUserFriends className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalUsers}</h2>
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-sm text-green-500">{userGrowth}% Growth</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaBoxOpen className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalProducts}</h2>
          <p className="text-gray-600 text-sm">Total Products</p>
          <p className="text-sm text-green-500">{productGrowth}% Growth</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaShoppingCart className="text-4xl text-purple-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalOrders}</h2>
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-sm text-green-500">{orderGrowth}% Growth</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaDollarSign className="text-4xl text-green-600 mb-4" />
          <h2 className="text-3xl font-bold mb-2">${totalSales.toLocaleString()}</h2>
          <p className="text-gray-600 text-sm">Total Sales</p>
          <p className="text-sm text-green-500">{salesGrowth}% Growth</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl text-red-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{overallGrowth}%</h2>
          <p className="text-gray-600 text-sm">Overall Growth</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Orders Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Orders</h2>
          <LineChart width={400} height={250} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Sales by Category Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Sales by Category</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={(entry) => `${entry.name} (${entry.value})`}
              fill="#8884d8"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
