import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:9000/api/orders');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Function to handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
        const response = await fetch(`http://localhost:9000/api/orders/${orderId}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderStatus: newStatus }),
        });

        if (!response.ok) {
            throw new Error('Failed to update status');
        }
        // Refresh the orders list to show the new status
        fetchOrders(); 
    } catch (error) {
        console.error("Error updating status:", error);
        // You can add a user-facing error message here
    }
  };

  if (loading) return <p className="text-center mt-8">Loading orders...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-8 my-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
            Manage Orders
        </h2>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order._id}>
                        <TableCell className="font-mono text-xs">{order._id}</TableCell>
                        <TableCell>
                            <div>{order.user?.name}</div>
                            <div className="text-sm text-gray-500">{order.user?.email}</div>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>৳ {order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}>
                                {order.paymentStatus}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline">{order.orderStatus}</Badge>
                        </TableCell>
                         <TableCell>
                            <Select 
                                defaultValue={order.orderStatus} 
                                onValueChange={(newStatus) => handleStatusChange(order._id, newStatus)}
                            >
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Change Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
};

export default ManageOrders;