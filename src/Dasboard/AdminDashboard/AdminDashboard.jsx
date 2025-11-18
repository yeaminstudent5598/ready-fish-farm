import React from 'react';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
    TrendingUp, 
    Users, 
    Package, 
    ShoppingCart, 
    DollarSign, 
    ArrowRight,
    Activity,
    Loader2
} from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();

    // সম্পূর্ণ ডায়নামিক ডেটা ফেচিং
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            // ১. প্যারালাল রিকোয়েস্ট: সব ডেটা একসাথে আনা হচ্ছে
            const [usersRes, productsRes, ordersRes] = await Promise.all([
                axiosSecure.get('/api/users'),
                axiosSecure.get('/api/products'),
                axiosSecure.get('/api/orders')
            ]);

            const orders = ordersRes.data;
            const products = productsRes.data;
            const users = usersRes.data;

            // ২. সাধারণ পরিসংখ্যান ক্যালকুলেশন
            // মোট রেভিনিউ (ক্যান্সেল অর্ডার বাদে)
            const totalRevenue = orders
                .filter(order => order.orderStatus !== 'cancelled')
                .reduce((total, order) => total + (order.totalAmount || 0), 0);
            
            // পেন্ডিং অর্ডার সংখ্যা
            const pendingOrders = orders.filter(order => order.orderStatus === 'pending').length;

            // সাম্প্রতিক ৫টি অর্ডার (সর্বশেষ অর্ডার আগে)
            // (API তে যদি sort({ createdAt: -1 }) করা থাকে তাহলে ঠিক আছে, না হলে এখানে sort করে নিতে পারেন)
            const recentOrders = orders.slice(0, 5);

            // ৩. চার্টের জন্য সম্পূর্ণ ডায়নামিক ডেটা তৈরি (গত ৭ মাস)
            const chartData = [];
            const today = new Date();
            
            for (let i = 6; i >= 0; i--) {
                const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                const monthName = d.toLocaleString('default', { month: 'short' }); // e.g., 'Nov'
                const monthIndex = d.getMonth();
                const year = d.getFullYear();

                // এই মাসের মোট রেভিনিউ বের করা
                const monthlyRevenue = orders
                    .filter(order => {
                        const orderDate = new Date(order.createdAt);
                        return (
                            orderDate.getMonth() === monthIndex && 
                            orderDate.getFullYear() === year && 
                            order.orderStatus !== 'cancelled' // ক্যান্সেল অর্ডার বাদ
                        );
                    })
                    .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

                chartData.push({ name: monthName, revenue: monthlyRevenue });
            }

            return {
                totalUsers: users.length,
                totalProducts: products.length,
                totalOrders: orders.length,
                totalRevenue,
                pendingOrders,
                recentOrders,
                chartData // ✅ এখন এটি ১০০% ডায়নামিক
            };
        }
    });

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen"><Loader2 className="h-10 w-10 animate-spin text-orange-600"/></div>;
    }

    return (
        <div className="p-6 md:p-8 bg-gray-50/50 min-h-screen space-y-8">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
                    <p className="text-muted-foreground mt-1">Welcome back, Admin! Here's your real-time business summary.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button className="bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-200">
                        Download Report
                    </Button>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">BDT {stats.totalRevenue?.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" /> 
                            <span className="text-green-600 font-medium">Lifetime Earning</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            <span className="text-orange-600 font-semibold">{stats.pendingOrders}</span> orders pending
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            In active inventory
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Registered customers
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts & Recent Orders Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                
                {/* Dynamic Sales Analytics Chart */}
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Sales Analytics</CardTitle>
                        <CardDescription>Revenue overview for the last 7 months (Live Data)</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.chartData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value}`} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                        itemStyle={{ color: '#f97316' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Dynamic Recent Orders List */}
                <Card className="col-span-3 shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Orders</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <CardDescription>Latest 5 transactions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {stats.recentOrders?.length > 0 ? (
                                stats.recentOrders.map((order) => (
                                    <div key={order._id} className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200">
                                            <ShoppingCart className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{order.user?.name || "Guest User"}</p>
                                            <p className="text-xs text-muted-foreground text-ellipsis overflow-hidden w-32 md:w-40">
                                                {order.user?.email}
                                            </p>
                                        </div>
                                        <div className="ml-auto font-medium text-sm text-right">
                                            <div className="text-gray-900">+৳{order.totalAmount}</div>
                                            <Badge 
                                                variant="outline" 
                                                className={`text-[10px] mt-1 border-0 ${
                                                    order.orderStatus === 'delivered' ? 'bg-green-100 text-green-700' : 
                                                    order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                                    order.orderStatus === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                                                }`}
                                            >
                                                {order.orderStatus}
                                            </Badge>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4">No recent orders found.</p>
                            )}
                        </div>
                        <div className="mt-6">
                            <Link to="/dashboard/orders">
                                <Button variant="outline" className="w-full group">
                                    View All Orders <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;