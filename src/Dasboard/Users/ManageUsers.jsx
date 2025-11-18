import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAxiosSecure from '../../Hooks/useAxiosSecure'; // axiosSecure ব্যবহার করা ভালো

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get('/api/users');
      setUsers(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axiosSecure.patch(`/api/users/${userId}/role`, { role: newRole });
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading users...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-8 my-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
        Manage Users
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Info</TableHead>
            <TableHead>Current Role</TableHead>
            <TableHead>Change Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.name ? user.name.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Select
                  defaultValue={user.role}
                  onValueChange={(newRole) => handleRoleChange(user._id, newRole)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Set Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers; 