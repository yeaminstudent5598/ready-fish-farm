import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const API_URL = "https://server-side-ready-food-farm-ecru.vercel.app/api/products";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleStatusChange = async (productId, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/status/${productId}`, {
        status: !currentStatus,
      });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${API_URL}/${productId}`);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === "published") return product.status === true;
    if (filter === "draft") return product.status === false;
    return true;
  });

  if (loading) return <p className="p-8 text-center">Loading products...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/dashboard/add-product">
            <Button><PlusCircle className="h-4 w-4 mr-2" />Add Product</Button>
          </Link>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SL</TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow key={product._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={product.images?.[0] || 'https://placehold.co/600x600/EBF5FF/7A7A7A?text=N/A'}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
                  <TableCell>৳{product.pricing.regular}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.status ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => handleStatusChange(product._id, product.status)}
                    >
                      {product.status ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link to={`/dashboard/edit-product/${product.slug}`}>
                        <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This will permanently delete "{product.name}". This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                          <DialogClose asChild>
                            <Button variant="destructive" onClick={() => handleDelete(product._id)}>Delete</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="8" className="text-center h-24">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
