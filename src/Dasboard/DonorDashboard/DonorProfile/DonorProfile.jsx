import React, { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const DonorProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});

  // Fetch user's profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
    
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for updating the profile
  const updateProfileMutation = useMutation({
    mutationFn: (updatedData) => axiosSecure.patch(`/users/${updatedData.email}`, updatedData),
    onSuccess: () => {
      // Invalidate and refetch the user's profile after a successful update
      queryClient.invalidateQueries(["userProfile", user?.email]);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
    },
    onError: (error) => {
      Swal.fire("Error", "Failed to update profile.", "error");
      console.error(error);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setUpdatedProfile(profile); // Load the current profile into the state
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) {
    return <div><p className="min-h-screen flex items-center justify-center bg-gray-50"><div class="spinner"></div></p></div>;
  }

  return (
    <div className="pt-28 max-w-4xl mx-auto ">
      <div className="flex items-center space-x-4 pb-6 border-b border-gray-300">
        <div className="avatar">
          <div className="w-20 h-20 rounded-full ring ring-orange-400 ring-offset-2">
            <img
              src={profile?.image || "https://via.placeholder.com/150"}
              alt="Avatar"
            />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {profile?.name || "Donor Name"}
          </h2>
          <p className="text-gray-600">{profile?.email}</p>
        </div>
      </div>

      <form className="space-y-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={isEditing ? updatedProfile?.name : profile?.name}
              onChange={handleInputChange}
              className={`input input-bordered w-full ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-gray-700">Email</label>
            <input
              type="text"
              name="name"
              value={isEditing ? updatedProfile?.email : profile?.email}
              onChange={handleInputChange}
              className={`input input-bordered w-full ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
              disabled={false}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-gray-700">District</label>
            <input
              type="text"
              name="district"
              value={isEditing ? updatedProfile?.district : profile?.district}
              onChange={handleInputChange}
              className={`input input-bordered w-full ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-gray-700">Upazila</label>
            <input
              type="text"
              name="upazila"
              value={isEditing ? updatedProfile?.upazila : profile?.upazila}
              onChange={handleInputChange}
              className={`input input-bordered w-full ${
                isEditing ? "" : "bg-gray-100 cursor-not-allowed"
              }`}
              disabled={!isEditing}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-gray-700">Blood Group</label>
            {isEditing ? (
              <select
                name="bloodGroup"
                value={updatedProfile?.bloodGroup || ""}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select your blood group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <input
                type="text"
                name="bloodGroup"
                value={profile?.bloodGroup || "Not specified"}
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                disabled
              />
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-end mt-6">
        {isEditing ? (
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleSaveClick}
            disabled={updateProfileMutation.isLoading}
          >
            <FiSave size={20} /> Save
          </button>
        ) : (
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={handleEditClick}
          >
            <FiEdit size={20} /> Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DonorProfile;
