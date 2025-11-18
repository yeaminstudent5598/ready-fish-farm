import React from 'react';
import useAuth from '@/Hooks/useAuth';
import useCart from '@/Hooks/useCart';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Wallet, Package, ArrowRight } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const UserHome = () => {
    const { user } = useAuth();
    const { cartItems, cartTotal } = useCart();
    const axiosSecure = useAxiosSecure();

    // ইউজারের অর্ডার স্ট্যাটাস লোড করা
    const { data: stats, isLoading } = useQuery({
        queryKey: ['user-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/orders/my-orders');
            const orders = res.data;
            
            // কিছু সাধারণ পরিসংখ্যান বের করা
            const totalOrders = orders.length;
            const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);
            const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
            const deliveredOrders = orders.filter(o => o.orderStatus === 'delivered').length;

            return { totalOrders, totalSpent, pendingOrders, deliveredOrders, recentOrder: orders[0] };
        }
    });

    if (isLoading) {
        return <div className="p-10"><Skeleton className="w-full h-64 rounded-xl" /></div>;
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-[#f97316]">{user?.displayName?.split(' ')[0]}!</span> 👋
                </h1>
                <p className="text-gray-600 mt-1">Here's what's happening with your account today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">BDT {stats?.totalSpent.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime purchase value</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">{stats?.deliveredOrders} delivered successfully</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cart Items</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cartItems.length}</div>
                        <p className="text-xs text-muted-foreground">BDT {cartTotal.toFixed(2)} in cart</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <Package className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{stats?.pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">Processing currently</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Recent Order Card */}
                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Recent Order</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {stats?.recentOrder ? (
                                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                                    <div>
                                        <p className="font-semibold text-gray-800">Order #{stats.recentOrder._id.slice(-6).toUpperCase()}</p>
                                        <p className="text-sm text-gray-500">{new Date(stats.recentOrder.createdAt).toDateString()}</p>
                                        <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block capitalize ${
                                            stats.recentOrder.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {stats.recentOrder.orderStatus}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg">BDT {stats.recentOrder.totalAmount}</p>
                                        <Link to="/dashboard/my-orders">
                                            <Button variant="link" className="text-orange-600 p-0 h-auto">View Details</Button>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>No recent orders found.</p>
                                    <Link to="/">
                                        <Button className="mt-4 bg-orange-600 hover:bg-orange-700">Start Shopping</Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div>
                    <Card className="h-full bg-orange-50 border-orange-100">
                        <CardHeader>
                            <CardTitle className="text-orange-800">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <Link to="/cart">
                                <Button className="w-full justify-between bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 shadow-sm">
                                    View My Cart <ShoppingBag className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/wishlist">
                                <Button className="w-full justify-between bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 shadow-sm">
                                    My Wishlist <Heart className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                            <Link to="/dashboard/my-profile">
                                <Button className="w-full justify-between bg-orange-600 text-white hover:bg-orange-700 shadow-md">
                                    Edit Profile <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default UserHome;