import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2 } from "lucide-react";

// The base URL for your API
const API_URL = "http://localhost:9000/api/categories";

export default function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for the dialog form
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ _id: null, name: "", parentId: "" });

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(API_URL);
      setCategories(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch categories.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handlers for opening the dialog
  const handleOpenCreateDialog = () => {
    setIsEditMode(false);
    setCurrentCategory({ _id: null, name: "", parentId: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (category) => {
    setIsEditMode(true);
    setCurrentCategory({
      _id: category._id,
      name: category.name,
      parentId: category.parentId?._id || "", // Use parent's _id or empty string
    });
    setIsDialogOpen(true);
  };

  // Handle form submission (for both Create and Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentCategory.name.trim()) {
      alert("Category name is required.");
      return;
    }

    const payload = {
      name: currentCategory.name.trim(),
      parentId: currentCategory.parentId || null,
    };

    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${currentCategory._id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      fetchCategories(); // Refresh list after action
      setIsDialogOpen(false); // Close dialog on success
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred. Please try again.");
      console.error(err);
    }
  };

  // Handle category deletion with confirmation
  const handleDelete = async (categoryId) => {
    try {
        await axios.delete(`${API_URL}/${categoryId}`);
        fetchCategories(); // Refresh list
    } catch (err) {
        alert(err.response?.data?.message || "Failed to delete category.");
        console.error(err);
    }
  };


  if (loading) return <p className="p-8 text-center">Loading categories...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <Button onClick={handleOpenCreateDialog}>Add New Category</Button>
      </div>

      {/* Category Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <TableRow key={cat._id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.parentId?.name || "—"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(cat)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete the category. Any sub-categories will become main categories.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                                <DialogClose asChild>
                                    <Button variant="destructive" onClick={() => handleDelete(cat._id)}>Delete</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="3" className="text-center">No categories found. Click "Add New Category" to start.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Category" : "Create New Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={currentCategory.name}
                onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                placeholder="e.g., Fish & Seafood"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentId">Parent Category</Label>
               <Select
                  value={currentCategory.parentId}
                  onValueChange={(value) => setCurrentCategory({ ...currentCategory, parentId: value === "none" ? "" : value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a parent (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {categories
                      .filter(c => c._id !== currentCategory._id) // A category can't be its own parent
                      .map(c => (
                        <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
            </div>
            <DialogFooter>
              <Button type="submit">{isEditMode ? "Save Changes" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
