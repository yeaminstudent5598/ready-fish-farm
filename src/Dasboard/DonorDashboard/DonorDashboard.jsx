import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: donationRequests = [], refetch, isLoading } = useQuery({
    queryKey: ["donationRequests", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/donation-request/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleStatusChange = (id, newStatus) => {
    axiosSecure
      .patch(`/create-donation-request/${id}`, { status: newStatus })
      .then(() => {
        refetch();
        Swal.fire(
          "Success!",
          `Donation request marked as ${newStatus}.`,
          "success"
        );
      })
      .catch((err) => {
        Swal.fire("Error!", "Failed to update status. Please try again later.", "error");
        console.error(err);
      });
  };

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
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete request. Please try again.", "error");
            console.error(err);
          });
      }
    });
  };

  const handleViewRequest = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/donation-details/${id}`);
    }
  };

  if (isLoading) {
    return <p className="text-center"><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></p>;
  }

  const recentRequests = donationRequests.slice(0, 3);

  return (
    <div className="container mx-auto pt-28 p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || user?.displayName}!</h1>

      {recentRequests.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Donation Requests</h2>
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
              {recentRequests.map((req) => (
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
                      onClick={() => handleViewRequest(req._id)}
                    >
                      View
                    </button>
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleStatusChange(req._id, "done")}
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleStatusChange(req._id, "canceled")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/dashboard/edit-create-request/${req._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No donation requests found. Why not create one?</p>
      )}

      {donationRequests.length > 0 && (
        <button
          className="btn btn-secondary mt-4"
          onClick={() => navigate("/dashboard/my-donation")}
        >
          View My All Requests
        </button>
      )}
    </div>
  );
};

export default DonorDashboard;
