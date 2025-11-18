import React, { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const AdminProfile = () => {
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
    return <div> <div className="loading min-h-screen flex items-center justify-center bg-gray-50">
    <svg width="64px" height="48px">
      <polyline
        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        id="back"
        className="stroke-gray-300 stroke-2 fill-none"
      ></polyline>
      <polyline
        points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
        id="front"
        className="stroke-blue-500 stroke-2 fill-none animate-dash"
      ></polyline>
    </svg>
  </div></div>;
  }

  return (
    <div className="container mx-auto pt-28">
  {/* Avatar Container */}
  <div className="w-32 h-32 flex justify-center items-center rounded-full border-4 border-primary overflow-hidden mx-auto">
    <img
      src={profile?.image || "https://via.placeholder.com/150"}
      alt="Avatar"
      className="object-cover w-full h-full"
    />
  </div>
  
  <div>
    <h2 className="text-3xl font-bold text-center text-gray-800">Admin Profile</h2>
    <div>
    <p className="text-xl text-center font-medium text-gray-700">Email: {profile?.email}</p>
    </div>
  </div>
  
  <div className="flex  flex-col items-center space-y-6 lg:space-x-6">
    <div className="flex flex-col space-y-4 lg:w-2/3">
      

      <form className="space-y-4">
        <div className="form-control">
          <label className="label font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={isEditing ? updatedProfile?.name : profile?.name}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Email</label>
          <input
            type="text"
            name="name"
            value={isEditing ? updatedProfile?.email : profile?.email}
            onChange={handleInputChange}
            className={`input input-bordered w-full bg-gray-200 cursor-not-allowed"`}
            disabled={false}
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">District</label>
          <input
            type="text"
            name="district"
            value={isEditing ? updatedProfile?.district : profile?.district}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={isEditing ? updatedProfile?.upazila : profile?.upazila}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>

        <div className="form-control">
          <label className="label font-semibold">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={isEditing ? updatedProfile?.bloodGroup : profile?.bloodGroup}
            onChange={handleInputChange}
            className={`input input-bordered w-full ${isEditing ? "" : "bg-gray-200 cursor-not-allowed"}`}
            disabled={!isEditing}
          />
        </div>
      </form>

      <div className="flex justify-center mt-6">
        {isEditing ? (
          <button
            className="btn btn-primary flex items-center gap-2"
            onClick={handleSaveClick}
            disabled={updateProfileMutation.isLoading}
          >
            <FiSave size={20} />
            Save
          </button>
        ) : (
          <button
            className="btn btn-secondary flex items-center gap-2"
            onClick={handleEditClick}
          >
            <FiEdit size={20} />
            Edit
          </button>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default AdminProfile;
