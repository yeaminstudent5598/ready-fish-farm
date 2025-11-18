import React, { useState } from 'react';
import useAuth from '@/Hooks/useAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

// ছোট কম্পোনেন্ট: অর্ডার টেবিল
const MyOrdersTable = () => {
    const axiosSecureInstance = useAxiosSecure();

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: async () => {
            const res = await axiosSecureInstance.get('/api/orders/my-orders');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    if (orders.length === 0) {
        return <p className="text-center text-gray-500 py-10">You have no orders yet.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order._id}>
                        <TableCell className="font-mono text-xs">{order._id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="font-semibold">BDT {order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                            <Badge 
                                variant={
                                    order.orderStatus === 'delivered' ? 'default' : 
                                    order.orderStatus === 'cancelled' ? 'destructive' : 
                                    'secondary'
                                }
                                className={order.orderStatus === 'delivered' ? 'bg-green-600' : ''}
                            >
                                {order.orderStatus}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

// ছোট কম্পোনেন্ট: পাসওয়ার্ড পরিবর্তন
const ChangePasswordForm = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm();
    const newPassword = watch("newPassword");

    const onSubmit = async (data) => {
        if (!user) {
            toast.error("You are not logged in.");
            return;
        }

        const auth = getAuth();
        const credential = EmailAuthProvider.credential(user.email, data.currentPassword);

        try {
            // ১. রি-অথেন্টিকেট
            await reauthenticateWithCredential(auth.currentUser, credential);

            // ২. পাসওয়ার্ড আপডেট
            await updatePassword(auth.currentUser, data.newPassword);
            
            toast.success("Password updated successfully!");
            reset();

        } catch (error) {
            console.error(error);
            if (error.code === 'auth/wrong-password') {
                toast.error("Incorrect current password.");
            } else {
                toast.error("Failed to update password. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input 
                    id="currentPassword" 
                    type="password" 
                    {...register("currentPassword", { required: "Current password is required" })}
                />
                {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
            </div>
            <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                    id="newPassword" 
                    type="password"
                    {...register("newPassword", { 
                        required: "New password is required",
                        minLength: { value: 6, message: "Must be at least 6 characters" }
                    })} 
                />
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>
            <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                    id="confirmPassword" 
                    type="password" 
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: value => value === newPassword || "Passwords do not match"
                    })}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
            </Button>
        </form>
    );
};


// মূল প্রোফাইল পেজ কম্পোনেন্ট
const MyProfilePage = () => {
    const { user } = useAuth();

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-lg">
                    <TabsTrigger value="profile">Profile Details</TabsTrigger>
                    <TabsTrigger value="orders">My Orders</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* প্রোফাইল ট্যাব */}
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Details</CardTitle>
                            <CardDescription>Your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center gap-6">
                            <img 
                                src={user?.photoURL || 'https://placehold.co/100x100/F97316/white?text=User'} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full border-4 border-red-200 object-cover"
                            />
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold">{user?.displayName}</h3>
                                <p className="text-gray-600">{user?.email}</p>
                                {/* আপনি ইউজার মডেল থেকে ফোন নম্বরও এখানে দেখাতে পারেন */}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* অর্ডার ট্যাব */}
                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>My Order History</CardTitle>
                            <CardDescription>Here are all the orders you've placed.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MyOrdersTable />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* সিকিউরিটি ট্যাব */}
                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your account's password. Requires your current password.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChangePasswordForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MyProfilePage;