import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("all"); // 'all', 'pending', 'accepted', 'completed', 'inprogress', 'done', 'canceled'
  const [currentPage, setCurrentPage] = useState(1); // Start at page 1
  const requestsPerPage = 5; // Number of requests per page

  // Fetch donation requests from API
  const { data: requests = [], refetch, isLoading, error } = useQuery({
    queryKey: ["donationRequests", user?.email, filter, currentPage],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/donation-request/${user.email}`, {
        params: {
          status: filter === "all" ? "" : filter, // Passing empty string for 'all'
          page: currentPage,
          limit: requestsPerPage,
        },
      });
      return res.data;
    },
    enabled: !!user?.email, // Only run if user email exists
  });

  // Filter requests based on the selected status
  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((request) => request.status === filter);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilter(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/create-donation-request/${id}`)
          .then(() => {
            refetch();
            Swal.fire("Deleted!", "The donation request has been deleted.", "success");
            setCurrentPage(1); // Optional: Reset page to 1 after deletion
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete request. Please try again.", "error");
            console.error(err);
          });
      }
    });
  };

  if (isLoading) {
    return <p><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4 pt-28">
      <h1 className="text-3xl font-bold mb-6">My Donation Requests</h1>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="border p-2"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option> 
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table of Donation Requests */}
      {filteredRequests.length > 0 ? (
        <div>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Recipient Name</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Blood Group</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{req.recipientName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{req.donationDate}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.donationTime}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.bloodGroup}</td>
                  <td className="border border-gray-300 px-4 py-2">{req.status}</td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => navigate(`/donation-details/${req._id}`)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/dashboard/edit-create-request/${req._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(req._id)} // Delete action
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-between">
            <button
              className="btn btn-sm btn-secondary"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No donation requests found. Why not create one?</p>
      )}
    </div>
  );
};

export default MyDonationRequests;
