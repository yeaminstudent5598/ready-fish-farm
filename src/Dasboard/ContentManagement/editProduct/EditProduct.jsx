import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ArrowLeft, Save, X, UploadCloud } from "lucide-react";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

// Constants
const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

const EditProduct = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const { register, handleSubmit, control, reset, setValue, watch, formState: { errors } } = useForm();

    // Rich Text Editors State
    const [description, setDescription] = useState("");
    const [specification, setSpecification] = useState("");
    const [warranty, setWarranty] = useState("");

    // UI & Data State
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeal, setIsDeal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [existingImages, setExistingImages] = useState([]); 

    // ১. ক্যাটাগরি লোড করা
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosPublic.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, [axiosPublic]);

    // ২. প্রোডাক্ট ডেটা ফেচ করা
    const { data: product, isLoading: isProductLoading } = useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            const res = await axiosPublic.get(`/api/products/${slug}`);
            return res.data;
        }
    });

    // ৩. ✅ [FIXED] ডাটা আসার পর ফর্ম পপুলেট করা (useEffect দিয়ে)
    useEffect(() => {
        if (product) {
            // সাধারণ ফিল্ডগুলো রিসেট করা
            reset({
                name: product.name,
                brand: product.brand,
                category: product.category?._id, // ক্যাটাগরি আইডি
                stock: product.stock,
                status: product.status,
                pricing: {
                    regular: product.pricing?.regular,
                    discount: product.pricing?.discount
                },
                seo: {
                    metaTitle: product.seo?.metaTitle,
                    metaDescription: product.seo?.metaDescription
                }
            });

            // Rich Text এবং অন্যান্য স্টেট ম্যানুয়ালি সেট করা
            setDescription(product.details?.description || "");
            setSpecification(product.details?.specification || "");
            setWarranty(product.details?.warranty || "");
            setExistingImages(product.images || []);
            
            // Deal টগল চেক করা
            if (product.pricing?.discount && product.pricing.discount > 0) {
                setIsDeal(true);
            }
        }
    }, [product, reset]);

    // Deal Toggle Handler
    const handleDealToggle = (checked) => {
        setIsDeal(checked);
        if (!checked) {
            setValue('pricing.discount', '');
        }
    };

    // আগের ছবি রিমুভ করার ফাংশন
    const handleRemoveImage = (indexToRemove) => {
        setExistingImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    // ৪. ফর্ম সাবমিট হ্যান্ডলার (আপডেট)
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Updating product...");

        try {
            // নতুন ছবি আপলোড করা (যদি থাকে)
            let newImageUrls = [];
            if (data.newImages && data.newImages.length > 0) {
                const uploadPromises = Array.from(data.newImages).map(file => {
                    const formData = new FormData();
                    formData.append("image", file);
                    return axiosPublic.post(imageHostingApi, formData);
                });

                const responses = await Promise.all(uploadPromises);
                newImageUrls = responses.map(res => res.data.data.url);
            }

            // আগের ছবি এবং নতুন ছবি মার্জ করা
            const finalImages = [...existingImages, ...newImageUrls];

            // আপডেট ডেটা অবজেক্ট তৈরি
            const updatedProductData = {
                name: data.name,
                brand: data.brand,
                category: data.category,
                stock: parseInt(data.stock, 10),
                status: data.status,
                images: finalImages,
                pricing: {
                    regular: parseFloat(data.pricing.regular),
                    discount: data.pricing.discount ? parseFloat(data.pricing.discount) : null,
                },
                details: { 
                    description, 
                    specification, 
                    warranty 
                },
                seo: {
                    metaTitle: data.seo.metaTitle,
                    metaDescription: data.seo.metaDescription,
                },
            };

            // সার্ভারে PATCH রিকোয়েস্ট
            const response = await axiosSecure.patch(`/api/products/${product._id}`, updatedProductData);

            if (response.status === 200) {
                toast.success("Product updated successfully!", { id: toastId });
                queryClient.invalidateQueries(['products']); // ক্যাশ আপডেট
                navigate('/dashboard/manage-product'); // লিস্ট পেজে ব্যাক
            } else {
                toast.error("Failed to update product.", { id: toastId });
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Server error occurred.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isProductLoading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-10 w-10 animate-spin text-orange-600" /></div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-6 md:p-8 my-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl space-y-8">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="ghost" onClick={() => navigate(-1)} className="p-0 hover:bg-transparent">
                        <ArrowLeft className="h-6 w-6 text-gray-600" />
                    </Button>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Edit Product</h2>
                </div>
                <Button type="submit" disabled={isSubmitting} className="bg-orange-600 hover:bg-orange-700">
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Updating...</> : <><Save className="mr-2 h-4 w-4"/> Update Changes</>}
                </Button>
            </div>

            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" {...register("name", { required: "Name is required" })} />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>Brand</Label>
                    <Controller name="brand" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                            <SelectContent><SelectItem value="Ready-Food-Farm">Ready Food Farm</SelectItem></SelectContent>
                        </Select>
                    )} />
                </div>
                <div>
                    <Label>Category</Label>
                    <Controller name="category" control={control} rules={{ required: "Category is required" }} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )} />
                </div>
                <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" {...register("stock", { required: "Stock is required" })} />
                </div>
                <div>
                    <Label htmlFor="regularPrice">Regular Price (BDT)</Label>
                    <Input id="regularPrice" type="number" step="0.01" {...register("pricing.regular", { required: true })} />
                </div>
                
                {/* Deal Switch */}
                <div className="flex flex-col gap-2 mt-1">
                    <div className="flex items-center gap-4">
                        <Label htmlFor="is-deal-switch" className="whitespace-nowrap">Make it a Deal?</Label>
                        <Switch id="is-deal-switch" checked={isDeal} onCheckedChange={handleDealToggle} />
                    </div>
                    {isDeal && (
                        <div className="mt-2">
                            <Input 
                                type="number" 
                                step="0.01" 
                                {...register("pricing.discount")} 
                                placeholder="Discount Price" 
                                className="border-red-300 focus:ring-red-500"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Image Management Section */}
            <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                <Label className="text-lg font-semibold">Product Images</Label>
                
                {/* Existing Images Preview */}
                {existingImages.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-4">
                        {existingImages.map((img, index) => (
                            <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden group bg-white shadow-sm">
                                <img src={img} alt="Product" className="w-full h-full object-cover" />
                                <button 
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add New Images */}
                <div>
                    <Label htmlFor="newImages" className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded-md border border-dashed border-gray-300 text-sm font-medium text-gray-600">
                        <UploadCloud className="h-5 w-5" />
                        Upload New Images (Click to browse)
                    </Label>
                    <Input id="newImages" type="file" multiple accept="image/*" {...register("newImages")} className="hidden" />
                    <p className="text-xs text-gray-500 mt-2">Selecting new images will add them to existing ones.</p>
                </div>
            </div>

            {/* Publish Status */}
            <div className="flex items-center gap-4">
                <Label htmlFor="status">Publish Status</Label>
                <Controller name="status" control={control} render={({ field }) => (
                    <Switch id="status" checked={field.value} onCheckedChange={field.onChange} />
                )} />
            </div>

            {/* Rich Text Details */}
            <div>
                <Label className="block mb-2 text-lg font-semibold">Product Details</Label>
                <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Full Description</TabsTrigger>
                        <TabsTrigger value="specification">Specification</TabsTrigger>
                        <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description"><JoditEditor value={description} onBlur={newContent => setDescription(newContent)} /></TabsContent>
                    <TabsContent value="specification"><JoditEditor value={specification} onBlur={newContent => setSpecification(newContent)} /></TabsContent>
                    <TabsContent value="warranty"><JoditEditor value={warranty} onBlur={newContent => setWarranty(newContent)} /></TabsContent>
                </Tabs>
            </div>

            {/* SEO Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">SEO Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input id="metaTitle" {...register("seo.metaTitle")} placeholder="SEO Title" />
                    </div>
                    <div>
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea id="metaDescription" {...register("seo.metaDescription")} placeholder="SEO Description" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default EditProduct;