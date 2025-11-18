import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// Constants for API endpoints
const IMGBB_API_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

const AddProduct = () => {
    // Form handling using react-hook-form
    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm();
    
    // State for rich text editors
    const [description, setDescription] = useState("");
    const [specification, setSpecification] = useState("");
    const [warranty, setWarranty] = useState("");

    // State for UI control
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeal, setIsDeal] = useState(false);
    
    // State for dynamic data
    const [categories, setCategories] = useState([]);

    // Custom hooks for API calls
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    // Fetch categories when the component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosSecure.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                toast.error("Error: Could not load categories.");
            }
        };
        fetchCategories();
    }, [axiosSecure]);

    // Handler for the "Make it a Deal" switch
    const handleDealToggle = (checked) => {
        setIsDeal(checked);
        if (!checked) {
            setValue('pricing.discount', ''); // Clear discount field if deal is turned off
        }
    };

    // Form submission handler
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Processing your request...");

        // Step 1: Upload images to ImgBB
        let imageUrls = [];
        if (data.images && data.images.length > 0) {
            toast.loading("Uploading images...", { id: toastId });
            const uploadPromises = Array.from(data.images).map(file => {
                const formData = new FormData();
                formData.append("image", file);
                return axiosPublic.post(imageHostingApi, formData);
            });

            try {
                const responses = await Promise.all(uploadPromises);
                imageUrls = responses.map(res => res.data.data.url).filter(url => url);
            } catch (error) {
                toast.error("Error: Could not upload images.", { id: toastId });
                setIsSubmitting(false);
                return;
            }
        }

        // Step 2: Prepare product data for the backend
        toast.loading("Saving product data...", { id: toastId });
        const productData = {
            name: data.name,
            brand: data.brand,
            category: data.category,
            stock: parseInt(data.stock, 10),
            status: data.status || false,
            images: imageUrls,
            pricing: {
                regular: parseFloat(data.pricing.regular),
                discount: data.pricing.discount ? parseFloat(data.pricing.discount) : null,
            },
            details: { description, specification, warranty },
            seo: {
                metaTitle: data.seo.metaTitle,
                metaDescription: data.seo.metaDescription,
            },
        };

        // Step 3: Post the data to the backend server
        try {
            const response = await axiosSecure.post('/api/products', productData);
            if (response.status === 201) {
                toast.success("Product added successfully!", { id: toastId });
                reset();
                setDescription('');
                setSpecification('');
                setWarranty('');
                setIsDeal(false);
            } else {
                toast.error(`Error: ${response.data.message || 'Something went wrong.'}`, { id: toastId });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "A server error occurred.", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-8 my-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl space-y-8">
            <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Add New Product</h2>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" {...register("name", { required: "Product name is required" })} placeholder="e.g., Organic Hilsha Fish" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                    <Label>Brand</Label>
                    <Controller name="brand" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                            <SelectContent><SelectItem value="Ready-Food-Farm">Ready Food Farm</SelectItem></SelectContent>
                        </Select>
                    )} />
                </div>
                <div>
                    <Label>Category</Label>
                    <Controller name="category" control={control} rules={{ required: "Category is required" }} render={({ field, fieldState }) => (
                        <>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {fieldState.error && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                        </>
                    )} />
                </div>
                <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input id="stock" type="number" {...register("stock", { required: "Stock is required" })} placeholder="e.g., 50" />
                     {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
                </div>
                <div>
                    <Label htmlFor="regularPrice">Regular Price (BDT)</Label>
                    <Input id="regularPrice" type="number" step="0.01" {...register("pricing.regular", { required: "Regular price is required" })} placeholder="e.g., 1200" />
                    {errors.pricing?.regular && <p className="text-red-500 text-xs mt-1">{errors.pricing.regular.message}</p>}
                </div>
                <div className="flex items-center gap-4 pt-6">
                    <Label htmlFor="is-deal-switch" className="whitespace-nowrap">Make it a Deal?</Label>
                    <Switch
                        id="is-deal-switch"
                        checked={isDeal}
                        onCheckedChange={handleDealToggle}
                    />
                </div>
                {isDeal && (
                    <div className="lg:col-start-2">
                        <Label htmlFor="discountPrice" className="text-red-600">Discount Price (BDT)</Label>
                        <Input
                            id="discountPrice"
                            type="number"
                            step="0.01"
                            {...register("pricing.discount", { required: "Discount price is required for a deal" })}
                            placeholder="e.g., 999"
                            className="border-red-300 focus:ring-red-500"
                        />
                         {errors.pricing?.discount && <p className="text-red-500 text-xs mt-1">{errors.pricing.discount.message}</p>}
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="images">Product Images (You can select multiple)</Label>
                <Input id="images" type="file" multiple accept="image/*" {...register("images")} />
            </div>

            <div className="flex items-center gap-4 pt-2">
                <Label htmlFor="status">Publish Status</Label>
                <Controller name="status" control={control} render={({ field }) => (
                    <Switch id="status" checked={field.value || false} onCheckedChange={field.onChange} />
                )} />
            </div>

            <div>
                <Label className="block mb-2 text-lg font-semibold">Product Details</Label>
                <Tabs defaultValue="description" className="w-full">
                    <TabsList>
                        <TabsTrigger value="description">Full Description</TabsTrigger>
                        <TabsTrigger value="specification">Specification</TabsTrigger>
                        <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description"><JoditEditor value={description} onBlur={newContent => setDescription(newContent)} /></TabsContent>
                    <TabsContent value="specification"><JoditEditor value={specification} onBlur={newContent => setSpecification(newContent)} /></TabsContent>
                    <TabsContent value="warranty"><JoditEditor value={warranty} onBlur={newContent => setWarranty(newContent)} /></TabsContent>
                </Tabs>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">SEO Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="metaTitle">Meta Title</Label>
                        <Input id="metaTitle" {...register("seo.metaTitle")} placeholder="Title for Google search results" />
                    </div>
                    <div>
                        <Label htmlFor="metaDescription">Meta Description</Label>
                        <Textarea id="metaDescription" {...register("seo.metaDescription")} placeholder="Short description for SEO" />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddProduct;