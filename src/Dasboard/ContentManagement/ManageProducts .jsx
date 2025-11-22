import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure"; // ✅ সঠিক হুক ব্যবহার
import toast from "react-hot-toast";
import { 
    Pencil, 
    Trash2, 
    PlusCircle, 
    Search, 
    Loader2, 
    MoreHorizontal, 
    CheckCircle, 
    XCircle 
} from "lucide-react";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogTrigger
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ManageProducts = () => {
    const axiosSecure = useAxiosSecure(); // ✅ সিকিউর হুক কল
    const queryClient = useQueryClient();
    
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [productToDelete, setProductToDelete] = useState(null);

    // ১. ডেটা ফেচ করা (React Query দিয়ে)
    const { data: products = [], isLoading, isError } = useQuery({
        queryKey: ['manage-products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/products'); // ✅ টোকেন সহ রিকোয়েস্ট যাবে
            return res.data;
        }
    });

    // ২. স্ট্যাটাস টগল মিউটেশন
    const toggleStatusMutation = useMutation({
        mutationFn: async ({ id, currentStatus }) => {
            const res = await axiosSecure.patch(`/api/products/status/${id}`, {
                status: !currentStatus
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['manage-products']);
            toast.success("Product status updated!");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to update status.");
        }
    });

    // ৩. ডিলেট মিউটেশন
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/api/products/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['manage-products']);
            toast.success("Product deleted successfully.");
            setProductToDelete(null);
        },
        onError: (err) => {
            toast.error("Failed to delete product.");
        }
    });

    // ফিল্টারিং লজিক
    const filteredProducts = products.filter(product => {
        const matchesStatus = filter === "all" 
            ? true 
            : filter === "published" ? product.status === true : product.status === false;
        
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesStatus && matchesSearch;
    });

    if (isLoading) return <div className="flex justify-center items-center h-[80vh]"><Loader2 className="h-10 w-10 animate-spin text-orange-600"/></div>;
    if (isError) return <p className="text-center text-red-500 py-10">Failed to load products.</p>;

    return (
        <div className="p-6 md:p-10 bg-gray-50/50 min-h-screen">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your product inventory efficiently.</p>
                </div>
                <Link to="/dashboard/add-product">
                    <Button className="bg-[#f97316] hover:bg-[#ea6a10] shadow-lg shadow-orange-100">
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Product
                    </Button>
                </Link>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                        placeholder="Search products..." 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm text-gray-600 font-medium hidden md:block">Filter by:</span>
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead className="w-[250px]">Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <TableRow key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <TableCell>
                                        <div className="w-12 h-12 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={product.images?.[0] || 'https://placehold.co/600x600?text=No+Img'}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-semibold text-gray-800">{product.name}</div>
                                        <div className="text-xs text-gray-500">{product.brand || 'No Brand'}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-normal text-gray-600">
                                            {product.category?.name || "Uncategorized"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        ৳{product.pricing.regular}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`${product.stock < 10 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                                            {product.stock}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div 
                                            onClick={() => toggleStatusMutation.mutate({ id: product._id, currentStatus: product.status })}
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors border ${
                                                product.status 
                                                ? 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200' 
                                                : 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200'
                                            }`}
                                        >
                                            {product.status ? (
                                                <><CheckCircle className="w-3 h-3 mr-1"/> Published</>
                                            ) : (
                                                <><XCircle className="w-3 h-3 mr-1"/> Draft</>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link to={`/dashboard/edit-product/${product.slug}`} className="cursor-pointer flex items-center">
                                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => setProductToDelete(product)}
                                                    className="text-red-600 cursor-pointer flex items-center focus:text-red-600 focus:bg-red-50"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className="h-32 text-center text-gray-500">
                                    No products found matching your filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={!!productToDelete} onOpenChange={(isOpen) => !isOpen && setProductToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Product</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "<strong>{productToDelete?.name}</strong>"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                            variant="destructive" 
                            onClick={() => deleteMutation.mutate(productToDelete._id)}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default ManageProducts;