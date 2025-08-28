import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaExclamationCircle, FaHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CreateDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  // Fetch districts
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistrictData(data[2]?.data || []))
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  // Fetch upazilas
  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilaData(data[2]?.data || []))
      .catch((err) => console.error("Error loading upazilas:", err));
  }, []);

  // Filter upazilas when district changes
  useEffect(() => {
    if (selectedDistrictId) {
      setFilteredUpazilas(
        upazilaData.filter((upazila) => upazila.district_id === selectedDistrictId)
      );
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilaData]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: users = [], isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users/normal");
      return response.data;
    },
  });

  const loggedInUser = users.find((u) => u.email === user?.email);

  if (loggedInUser?.status === "blocked") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow-lg text-center">
          <FaExclamationCircle className="text-4xl mb-4" />
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>You are blocked and cannot create donation requests.</p>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    const selectedDistrict = districtData.find(
      (district) => district.id === data.recipientDistrict
    );

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: selectedDistrict?.name || "",
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
    };

    axiosSecure
      .post("/create-donation-request", donationRequest)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your donation request has been created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard/donor-dashboard");
        });
      })
      .catch((error) => {
        console.error("Error creating donation request:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to create donation request. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });

    reset();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 mt-24 bg-white shadow-lg rounded-lg">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-center items-center bg-red-600 text-white rounded-t-lg p-4">
        {/* Left Side Image */}
        <div className="flex-shrink-0">
          <img
            src="https://i.ibb.co/LtN4Pnc/Red-White-Blood-Donation-Instagram-Story-65b38a70e5df28-24233776.png"
            alt="Blood Donation"
            className="w-48 md:w-60"
          />
        </div>
        {/* Right Side Content */}
        <div className="ml-0 md:ml-4 mt-4 md:mt-0 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <FaHeart className="text-white text-2xl" />
            <h1 className="text-2xl font-bold">Create Donation Request</h1>
          </div>
          <p className="text-sm mt-2">
            Confidential - Please answer the following questions correctly. This
            will help to protect you and the patient who receives your blood.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
        {/* Requester Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Requester Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Requester Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Recipient Information */}
        <div>
          <label className="block text-sm font-medium">Recipient Name</label>
          <input
            type="text"
            {...register("recipientName", { required: "Recipient Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.recipientName && (
            <span className="text-red-500 text-sm">{errors.recipientName.message}</span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Recipient District</label>
            <select
              {...register("recipientDistrict", { required: "District is required" })}
              className="select select-bordered w-full"
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
            >
              <option value="">Select District</option>
              {districtData.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Recipient Upazila</label>
            <select
              {...register("recipientUpazila", { required: "Upazila is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <label className="block text-sm font-medium">Hospital Name</label>
          <input
            type="text"
            {...register("hospitalName", { required: "Hospital Name is required" })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Full Address</label>
          <input
            type="text"
            {...register("fullAddress", { required: "Address is required" })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Blood Group</label>
            <select
              {...register("bloodGroup", { required: "Blood Group is required" })}
              className="select select-bordered w-full"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Donation Date</label>
            <input
              type="date"
              {...register("donationDate", { required: "Donation Date is required" })}
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Donation Time</label>
          <input
            type="time"
            {...register("donationTime", { required: "Donation Time is required" })}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Request Message</label>
          <textarea
            {...register("requestMessage", { required: "Message is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Explain why you need blood..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;