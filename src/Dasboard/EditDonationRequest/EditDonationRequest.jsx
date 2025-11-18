import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const EditDonationRequest = () => {
  const { id } = useParams(); // Fetching the request ID from the URL
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [donationRequest, setDonationRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/create-donation-request/${id}`)
      .then((res) => {
        setDonationRequest(res.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Failed to fetch donation request details.", "error");
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDonationRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleUpdate = () => {
        axiosSecure
        .patch(`/create-donation-request/${id}`, donationRequest)
        .then(() => {
            Swal.fire("Success!", "Donation request updated successfully.", "success");
            navigate("/dashboard/donor-dashboard"); // Redirecting back to the dashboard
        })
        .catch((err) => {
            Swal.fire("Error!", "Failed to update donation request. Please try again.", "error");
            console.error(err);
        });
    };

  if (loading) {
    return <p className="text-center"><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></p>;
  }

  if (!donationRequest) {
    return <p className="text-center text-red-500">Donation request not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Donation Request</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={donationRequest.recipientName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="recipientDistrict"
            value={donationRequest.recipientDistrict}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="donationDate"
            value={donationRequest.donationDate}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Time</label>
          <input
            type="time"
            name="donationTime"
            value={donationRequest.donationTime}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={donationRequest.bloodGroup}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>
        <button
          className="btn btn-primary mt-4"
          onClick={handleUpdate}
        >
          Update Donation Request
        </button>
      </div>
    </div>
  );
};

export default EditDonationRequest;
