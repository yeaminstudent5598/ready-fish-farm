import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import JoditEditor from "jodit-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// !! IMPORTANT: Replace this with your own ImgBB API key
const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY"; // আপনার API কী এখানে দিন

const AddProduct = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const [description, setDescription] = useState("");
  const [specification, setSpecification] = useState("");
  const [warranty, setWarranty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatusMessage("Uploading images...");

    let imageUrls = [];
    if (data.images && data.images.length > 0) {
      const uploadPromises = Array.from(data.images).map(file => {
        const formData = new FormData();
        formData.append("image", file);
        return fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: formData,
        }).then(res => res.json());
      });
      try {
        const responses = await Promise.all(uploadPromises);
        imageUrls = responses.map(res => res.data.url).filter(url => url);
      } catch (error) {
        setStatusMessage("Error: Could not upload images.");
        setIsSubmitting(false);
        return;
      }
    }

    setStatusMessage("Saving product data...");
    
    // Structure the data to match the backend model
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
      details: {
        description,
        specification,
        warranty,
      },
      seo: {
        metaTitle: data.seo.metaTitle,
        metaDescription: data.seo.metaDescription,
      },
    };

    try {
      const response = await fetch('http://localhost:9000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (response.ok) {
        setStatusMessage("Product added successfully!");
        reset();
        setDescription(''); setSpecification(''); setWarranty('');
      } else {
        setStatusMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      setStatusMessage("A server error occurred.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatusMessage(""), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto p-8 my-8 bg-white shadow-lg rounded-xl space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Add New Product</h2>
            <div className="flex items-center gap-4">
                {statusMessage && <p className="text-sm text-gray-600">{statusMessage}</p>}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
            </div>
        </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input id="name" {...register("name", { required: true })} placeholder="e.g., Organic Hilsha Fish"/>
        </div>
        <div>
          <Label>Brand</Label>
          <Controller name="brand" control={control} render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger><SelectValue placeholder="Select brand"/></SelectTrigger>
              <SelectContent><SelectItem value="Ready-Food-Farm">Ready Food Farm</SelectItem></SelectContent>
            </Select>
          )}/>
        </div>
        <div>
          <Label>Category</Label>
           <Controller name="category" control={control} rules={{ required: true }} render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger><SelectValue placeholder="Select category"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="fish-seafood">Fish & Seafood</SelectItem>
                <SelectItem value="steaks-fillets">Steaks & Fillets</SelectItem>
              </SelectContent>
            </Select>
          )}/>
        </div>
        <div>
          <Label htmlFor="stock">Stock Quantity</Label>
          <Input id="stock" type="number" {...register("stock", { required: true })} placeholder="e.g., 50"/>
        </div>
        <div>
          <Label htmlFor="regularPrice">Regular Price (BDT)</Label>
          <Input id="regularPrice" type="number" {...register("pricing.regular", { required: true })} placeholder="e.g., 1200"/>
        </div>
        <div>
          <Label htmlFor="discountPrice">Discount Price (Optional)</Label>
          <Input id="discountPrice" type="number" {...register("pricing.discount")} placeholder="e.g., 999"/>
        </div>
         <div className="flex items-center gap-4 pt-6">
          <Label htmlFor="status">Publish Status</Label>
          <Controller name="status" control={control} render={({ field }) => (
            <Switch id="status" checked={field.value} onCheckedChange={field.onChange}/>
           )}/>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label htmlFor="images">Product Images</Label>
        <Input id="images" type="file" multiple {...register("images")} />
      </div>

      {/* Descriptions */}
      <div>
        <Label className="block mb-2 text-lg font-semibold">Product Details</Label>
        <Tabs defaultValue="description" className="w-full">
            <TabsList>
                <TabsTrigger value="description">Full Description</TabsTrigger>
                <TabsTrigger value="specification">Specification</TabsTrigger>
                <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
            </TabsList>
            <TabsContent value="description"><JoditEditor value={description} onBlur={setDescription}/></TabsContent>
            <TabsContent value="specification"><JoditEditor value={specification} onBlur={setSpecification}/></TabsContent>
            <TabsContent value="warranty"><JoditEditor value={warranty} onBlur={setWarranty}/></TabsContent>
        </Tabs>
      </div>

      {/* SEO */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">SEO Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input id="metaTitle" {...register("seo.metaTitle")} placeholder="Title for Google search results"/>
          </div>
          <div>
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea id="metaDescription" {...register("seo.metaDescription")} placeholder="Short description for SEO"/>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;