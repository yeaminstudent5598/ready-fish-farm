import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserFriends, FaHandHoldingUsd, FaHeartbeat, FaChartLine } from "react-icons/fa";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch funds
  const { data: funds = [], isLoading: isFundsLoading } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const res = await axiosSecure.get("create-payment-intent");
      return res.data;
    },
  });

  // Calculate total funds
  const totalFunds = funds.reduce((sum, fund) => sum + (fund.amount || 0), 0);

  // Fetch total users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users/normal");
      return response.data;
    },
  });

  // Fetch donation requests
  const { data: donationRequests = [] } = useQuery({
    queryKey: ["create-donation-request"],
    queryFn: async () => {
      const response = await axiosSecure.get("/create-donation-request");
      return response.data;
    },
  });

  // Calculate statistics
  const totalUsers = users.length;
  const totalRequests = donationRequests.length;

  // Calculate growth percentages
  const userGrowth = ((totalUsers / 100) * 10).toFixed(2); // Placeholder formula
  const fundsGrowth = ((totalFunds / 1000) * 5).toFixed(2); // Placeholder formula
  const requestGrowth = ((totalRequests / 100) * 15).toFixed(2); // Placeholder formula
  const overallGrowth = ((userGrowth * 1 + fundsGrowth * 1 + requestGrowth * 1) / 3).toFixed(2);

  // Prepare chart data
  const bloodGroupData = donationRequests.reduce((acc, request) => {
    const group = request.bloodGroup;
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(bloodGroupData).map(([group, count]) => ({
    name: group,
    value: count,
  }));

  // Prepare line chart data
  const monthlyData = donationRequests.reduce((acc, request) => {
    const month = request.donationDate?.substring(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const lineChartData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    count,
  }));

  // Loading state
  if (isFundsLoading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-center text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="p-6 mt-28  min-h-screen">
      
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Welcome, {user.displayName}</h1>
        <p className="text-gray-600">
          Manage and track your organization's progress efficiently.
        </p>
      </div>

      {/* Featured Cards for Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Total Users Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaUserFriends className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalUsers}</h2>
          <p className="text-gray-600 text-sm">Total Users (Donors)</p>
          <p className="text-sm text-green-500">{userGrowth}% Growth</p>
        </div>

        {/* Total Funding Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaHandHoldingUsd className="text-4xl text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">
            ${totalFunds.toLocaleString()}
          </h2>
          <p className="text-sm text-gray-600">Total Funding</p>
          <p className="text-sm text-green-500">{fundsGrowth}% Growth</p>
        </div>

        {/* Total Blood Donation Requests Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaHeartbeat className="text-4xl text-red-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{totalRequests}</h2>
          <p className="text-sm text-gray-600">Total Blood Requests</p>
          <p className="text-sm text-green-500">{requestGrowth}% Growth</p>
        </div>

        {/* Overall Growth Card */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
          <FaChartLine className="text-4xl text-purple-500 mb-4" />
          <h2 className="text-3xl font-bold mb-2">{overallGrowth}%</h2>
          <p className="text-sm text-gray-600">Overall Growth</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Monthly Donation Requests</h2>
          <LineChart width={380} height={250} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Blood Group Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"][index % 7]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
