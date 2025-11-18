import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAxiosSecure from '@/Hooks/useAxiosSecure'; 
import { Plus, Trash2, Loader2, CheckCircle, XCircle, Image as ImageIcon, Pencil, UploadCloud } from 'lucide-react';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";

// ImgBB API Key (আপনার .env ফাইল থেকে)
const imageHostKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    
    // Form States
    const [formData, setFormData] = useState({ name: '', isNav: false });
    const [selectedFile, setSelectedFile] = useState(null); // ✅ ফাইলের জন্য স্টেট
    
    // Loading States
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Modals State
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const axiosPublic = useAxiosPublic();
    const axiosSecureInstance = useAxiosSecure(); 

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            const response = await axiosPublic.get('/api/categories');
            setCategories(response.data); 
        } catch (err) {
            toast.error("Failed to load categories.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // ✅ ইমেজ আপলোড হেল্পার ফাংশন
    const uploadImageToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axiosPublic.post(imageHostingApi, formData, {
            headers: { 'content-type': 'multipart/form-data' }
        });
        return res.data.data.display_url;
    };

    // ✅ ১. নতুন ক্যাটাগরি তৈরি
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!formData.name) return toast.error("Category name is required.");

        setIsSubmitting(true);
        try {
            let imageUrl = '';
            
            // যদি ফাইল সিলেক্ট করা থাকে, আপলোড করুন
            if (selectedFile) {
                imageUrl = await uploadImageToImgBB(selectedFile);
            }

            const response = await axiosSecureInstance.post('/api/categories', { 
                name: formData.name,
                image: imageUrl, // URL পাঠানো হচ্ছে
                isNav: formData.isNav
            });
            
            await fetchCategories();
            toast.success(`Category "${response.data.name}" added!`);
            setIsModalOpen(false);
            
            // ফর্ম রিসেট
            setFormData({ name: '', isNav: false }); 
            setSelectedFile(null);

        } catch (err) {
            console.error(err);
            toast.error("Failed to add category. Check API key or Network.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const openEditModal = (category) => {
        setCategoryToEdit(category);
        setFormData({
            name: category.name,
            isNav: category.isNav
        });
        setSelectedFile(null); // এডিটের সময় ফাইল রিসেট
        setIsEditModalOpen(true);
    };

    // ✅ ২. ক্যাটাগরি আপডেট করা
    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!formData.name) return toast.error("Category name is required.");
        
        setIsSubmitting(true);
        try {
            let imageUrl = categoryToEdit.image; // ডিফল্টভাবে আগের ইমেজ থাকবে

            // যদি নতুন ফাইল সিলেক্ট করা হয়, তবেই আপলোড হবে
            if (selectedFile) {
                imageUrl = await uploadImageToImgBB(selectedFile);
            }

            const response = await axiosSecureInstance.patch(`/api/categories/${categoryToEdit._id}`, {
                name: formData.name,
                image: imageUrl,
                isNav: formData.isNav
            });

            setCategories(prev => prev.map(cat => cat._id === categoryToEdit._id ? response.data : cat));
            
            toast.success("Category updated successfully!");
            setIsEditModalOpen(false);
            setCategoryToEdit(null);
            setSelectedFile(null);
            
        } catch (err) {
            toast.error("Failed to update category.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleNavStatus = async (category) => {
        try {
            const newStatus = !category.isNav;
            setCategories(prev => prev.map(c => c._id === category._id ? { ...c, isNav: newStatus } : c));
            await axiosSecureInstance.patch(`/api/categories/${category._id}/nav-status`, { isNav: newStatus });
            toast.success(`Status updated for ${category.name}`);
        } catch (error) {
            toast.error("Failed to update status");
            fetchCategories();
        }
    };

    const confirmDeleteCategory = async () => {
        if (!categoryToDelete) return;
        try {
            await axiosSecureInstance.delete(`/api/categories/${categoryToDelete._id}`);
            setCategories(categories.filter(c => c._id !== categoryToDelete._id));
            toast.success(`Category deleted.`);
        } catch (err) {
            toast.error("Failed to delete category.");
        } finally {
            setCategoryToDelete(null);
        }
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Manage Categories</h1>
                
                <Dialog open={isModalOpen} onOpenChange={(open) => {
                    setIsModalOpen(open);
                    if(!open) { setFormData({ name: '', isNav: false }); setSelectedFile(null); }
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#f97316] hover:bg-[#ea6a10]">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleAddCategory}>
                            <DialogHeader>
                                <DialogTitle>Add New Category</DialogTitle>
                            </DialogHeader>
                            
                            <div className="grid gap-4 py-4">
                                <div>
                                    <Label htmlFor="name" className="font-semibold">Category Name</Label>
                                    <Input 
                                        id="name" 
                                        value={formData.name} 
                                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                        placeholder="e.g. Fish" 
                                        disabled={isSubmitting} 
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="file" className="font-semibold">Category Image</Label>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Input 
                                            id="file" 
                                            type="file" 
                                            accept="image/*"
                                            onChange={(e) => setSelectedFile(e.target.files[0])} 
                                            disabled={isSubmitting}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    {selectedFile && <p className="text-xs text-green-600 mt-1">Selected: {selectedFile.name}</p>}
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-md bg-gray-50">
                                    <Checkbox 
                                        id="isNav" 
                                        checked={formData.isNav}
                                        onCheckedChange={(checked) => setFormData(prev => ({...prev, isNav: checked}))}
                                    />
                                    <Label htmlFor="isNav" className="cursor-pointer">Show in Navbar?</Label>
                                </div>
                            </div>
                            
                            <DialogFooter>
                                <Button type="submit" className="bg-[#f97316]" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</>
                                    ) : (
                                        'Add Category'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-center">Navbar</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={4} className="text-center h-32"><Loader2 className="h-8 w-8 animate-spin text-[#f97316] mx-auto" /></TableCell></TableRow>
                        ) : categories.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center py-8 text-gray-500">No categories found.</TableCell></TableRow>
                        ) : (
                            categories.map((category) => (
                                <TableRow key={category._id} className="hover:bg-gray-50">
                                    <TableCell>
                                        <div className="w-10 h-10 rounded-md overflow-hidden border bg-gray-50 flex items-center justify-center">
                                            {category.image ? (
                                                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="text-gray-300 w-5 h-5" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {category.name}
                                        <div className="text-xs text-gray-400">{category.slug}</div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleNavStatus(category)}
                                            className={`h-6 text-[10px] px-2 rounded-full border ${category.isNav ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                                        >
                                            {category.isNav ? "Visible" : "Hidden"}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" className="text-blue-600 hover:bg-blue-50 h-8 w-8" onClick={() => openEditModal(category)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 h-8 w-8" onClick={() => setCategoryToDelete(category)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleUpdateCategory}>
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div>
                                <Label htmlFor="edit-name">Category Name</Label>
                                <Input id="edit-name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} disabled={isSubmitting} />
                            </div>
                            
                            {/* Image Preview & Upload */}
                            <div>
                                <Label htmlFor="edit-file">Update Image (Optional)</Label>
                                <div className="flex items-center gap-4 mt-2">
                                    {/* Current Image Preview */}
                                    <div className="w-16 h-16 rounded-md border flex items-center justify-center bg-gray-50 overflow-hidden">
                                        {selectedFile ? (
                                             <span className="text-xs text-gray-500 text-center px-1">New File</span>
                                        ) : categoryToEdit?.image ? (
                                            <img src={categoryToEdit.image} alt="Current" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-gray-400 w-6 h-6" />
                                        )}
                                    </div>
                                    
                                    <Input 
                                        id="edit-file" 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => setSelectedFile(e.target.files[0])} 
                                        disabled={isSubmitting}
                                        className="flex-1 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 border p-3 rounded-md bg-gray-50">
                                <Checkbox 
                                    id="edit-isNav" 
                                    checked={formData.isNav}
                                    onCheckedChange={(checked) => setFormData(prev => ({...prev, isNav: checked}))}
                                />
                                <Label htmlFor="edit-isNav" className="cursor-pointer">Show in Navbar?</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Update Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal (Same as before) */}
            <AlertDialog open={!!categoryToDelete} onOpenChange={(isOpen) => !isOpen && setCategoryToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Delete Category?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel onClick={() => setCategoryToDelete(null)}>Cancel</AlertDialogCancel><AlertDialogAction className="bg-red-600" onClick={confirmDeleteCategory}>Delete</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageCategories;