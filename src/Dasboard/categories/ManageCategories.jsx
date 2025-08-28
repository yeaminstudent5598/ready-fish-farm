import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import useAxiosSecure from '@/Hooks/useAxiosSecure';

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await axiosSecure.get('/api/categories');
            setCategories(res.data);
        } catch (error) {
            toast.error("Failed to fetch categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const onSubmit = async (data) => {
        try {
            const res = await axiosSecure.post('/api/categories', { name: data.categoryName });
            if (res.status === 201) {
                toast.success(`Category "${data.categoryName}" added!`);
                reset();
                fetchCategories(); // Refresh the list
            }
        } catch (error) {
            toast.error("Failed to add category.");
        }
    };
    
    const handleDelete = async (categoryId, categoryName) => {
        if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
            try {
                await axiosSecure.delete(`/api/categories/${categoryId}`);
                toast.success(`Category "${categoryName}" deleted.`);
                fetchCategories(); // Refresh the list
            } catch (error) {
                toast.error("Failed to delete category.");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 my-8 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Manage Categories</h2>

            {/* Add Category Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-4 mb-8">
                <div className="flex-1">
                    <Input
                        {...register("categoryName", { required: "Category name is required" })}
                        placeholder="Enter new category name"
                    />
                    {errors.categoryName && <p className="text-red-500 text-sm mt-1">{errors.categoryName.message}</p>}
                </div>
                <Button type="submit">Add Category</Button>
            </form>

            {/* Categories Table */}
            <h3 className="text-lg font-semibold mb-4">Existing Categories</h3>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serial No.</TableHead>
                            <TableHead>Category Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan="3" className="text-center">Loading...</TableCell></TableRow>
                        ) : (
                            categories.map((cat, index) => (
                                <TableRow key={cat._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="destructive" size="icon" onClick={() => handleDelete(cat._id, cat.name)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ManageCategories;