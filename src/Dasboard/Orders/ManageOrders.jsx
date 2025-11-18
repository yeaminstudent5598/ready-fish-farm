import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns'; // তারিখ ফরম্যাটের জন্য (npm install date-fns)
import { Eye, Loader2, Truck, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

// Shadcn UI Components
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ManageOrders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedOrder, setSelectedOrder] = useState(null); // ডিটেইলস দেখার জন্য

    // ১. সব অর্ডার ফেচ করা
    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['all-orders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/orders');
            return res.data;
        }
    });

    // ২. স্ট্যাটাস আপডেট করার মিউটেশন
    const statusMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecure.patch(`/api/orders/${id}/status`, { orderStatus: status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-orders']);
            toast.success("Order status updated successfully!");
        },
        onError: (error) => {
            toast.error("Failed to update status.");
            console.error(error);
        }
    });

    // স্ট্যাটাস কালার হেল্পার ফাংশন
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleStatusChange = (orderId, newStatus) => {
        statusMutation.mutate({ id: orderId, status: newStatus });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-10 w-10 animate-spin text-orange-500" /></div>;
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage All Orders</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="font-bold text-gray-700">Order ID</TableHead>
                            <TableHead className="font-bold text-gray-700">Customer Info</TableHead>
                            <TableHead className="font-bold text-gray-700">Date</TableHead>
                            <TableHead className="font-bold text-gray-700">Total</TableHead>
                            <TableHead className="font-bold text-gray-700">Payment</TableHead>
                            <TableHead className="font-bold text-gray-700">Status</TableHead>
                            <TableHead className="text-right font-bold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id} className="hover:bg-gray-50 transition-colors">
                                <TableCell className="font-mono text-xs font-medium text-gray-500">
                                    #{order._id.slice(-6).toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">{order.shippingAddress?.fullName || order.user?.name}</span>
                                        <span className="text-xs text-gray-500">{order.user?.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-600">
                                    {order.createdAt ? format(new Date(order.createdAt), 'dd MMM, yyyy') : 'N/A'}
                                </TableCell>
                                <TableCell className="font-bold text-gray-800">
                                    BDT {order.totalAmount}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="capitalize">
                                        {order.paymentStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Select 
                                        defaultValue={order.orderStatus} 
                                        onValueChange={(val) => handleStatusChange(order._id, val)}
                                        disabled={statusMutation.isPending}
                                    >
                                        <SelectTrigger className={`w-[130px] h-8 text-xs font-semibold border ${getStatusColor(order.orderStatus)}`}>
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending"><span className="flex items-center gap-2"><Clock className="w-3 h-3"/> Pending</span></SelectItem>
                                            <SelectItem value="processing"><span className="flex items-center gap-2"><Loader2 className="w-3 h-3"/> Processing</span></SelectItem>
                                            <SelectItem value="shipped"><span className="flex items-center gap-2"><Truck className="w-3 h-3"/> Shipped</span></SelectItem>
                                            <SelectItem value="delivered"><span className="flex items-center gap-2"><CheckCircle className="w-3 h-3"/> Delivered</span></SelectItem>
                                            <SelectItem value="cancelled"><span className="flex items-center gap-2"><XCircle className="w-3 h-3"/> Cancelled</span></SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => setSelectedOrder(order)}
                                                className="hover:bg-orange-100 text-orange-600"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </Button>
                                        </DialogTrigger>
                                        
                                        {/* Order Details Modal */}
                                        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                                    <Package className="text-orange-600"/> Order Details
                                                </DialogTitle>
                                            </DialogHeader>
                                            
                                            {selectedOrder && (
                                                <div className="space-y-6 mt-4">
                                                    {/* Customer & Shipping Info */}
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <Card className="bg-gray-50 border-none">
                                                            <CardContent className="p-4">
                                                                <h3 className="font-semibold mb-2 text-gray-700">Customer Info</h3>
                                                                <p className="text-sm"><strong>Name:</strong> {selectedOrder.user?.name}</p>
                                                                <p className="text-sm"><strong>Email:</strong> {selectedOrder.user?.email}</p>
                                                                <p className="text-sm"><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                                                            </CardContent>
                                                        </Card>
                                                        <Card className="bg-gray-50 border-none">
                                                            <CardContent className="p-4">
                                                                <h3 className="font-semibold mb-2 text-gray-700">Shipping Address</h3>
                                                                <p className="text-sm">{selectedOrder.shippingAddress?.address}</p>
                                                                <p className="text-sm">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}</p>
                                                                <p className="text-sm">{selectedOrder.shippingAddress?.country}</p>
                                                            </CardContent>
                                                        </Card>
                                                    </div>

                                                    {/* Order Items Table */}
                                                    <div>
                                                        <h3 className="font-semibold mb-3 text-gray-700">Ordered Items</h3>
                                                        <div className="border rounded-lg overflow-hidden">
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow className="bg-gray-100">
                                                                        <TableHead>Product</TableHead>
                                                                        <TableHead className="text-center">Qty</TableHead>
                                                                        <TableHead className="text-right">Price</TableHead>
                                                                        <TableHead className="text-right">Total</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {selectedOrder.items.map((item, idx) => (
                                                                        <TableRow key={idx}>
                                                                            <TableCell className="font-medium">
                                                                                {item.product?.name || "Unknown Product"}
                                                                            </TableCell>
                                                                            <TableCell className="text-center">{item.quantity}</TableCell>
                                                                            <TableCell className="text-right">BDT {item.price}</TableCell>
                                                                            <TableCell className="text-right font-semibold">
                                                                                BDT {item.price * item.quantity}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                    </div>

                                                    {/* Summary Footer */}
                                                    <div className="flex justify-end border-t pt-4">
                                                        <div className="text-right space-y-1">
                                                            <p className="text-sm text-gray-600">Subtotal: <span className="font-semibold">BDT {selectedOrder.totalAmount}</span></p>
                                                            <p className="text-sm text-gray-600">Delivery: <span className="font-semibold text-green-600">Free</span></p>
                                                            <p className="text-xl font-bold text-orange-600 mt-2">Total: BDT {selectedOrder.totalAmount}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Close</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell> {/* ✅ এটি এখন </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                {orders.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <Package className="mx-auto h-12 w-12 mb-3 opacity-20" />
                        <p>No orders found yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageOrders;