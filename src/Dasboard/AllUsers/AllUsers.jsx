import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers, FaEllipsisV } from "react-icons/fa";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  // Filter Users
  const filteredUsers =
    filter === "all"
      ? users
      : users.filter((user) => user.status === filter);

  // Pagination Logic
  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleStatusToggle = (user) => {
    const newStatus = user.status === "active" ? "blocked" : "active";

    axiosSecure
      .patch(`/users/status/${user._id}`, { status: newStatus })
      .then(() => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User is now ${newStatus}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to update user status.", "error");
        console.error(err);
      });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure
      .patch(`/users/admin/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now an admin!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to make user an admin.", "error");
        console.error(err);
      });
  };

  const handleMakeVolunteer = (user) => {
    axiosSecure
      .patch(`/users/volunteer/${user._id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is now a volunteer!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to make user a volunteer.", "error");
        console.error(err);
      });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "The user has been deleted.", "success");
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to delete user.", "error");
            console.error(err);
          });
      }
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">All Users</h2>
        <div className="flex items-center gap-4">
          <select
            className="select select-bordered"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
          <h2 className="text-3xl font-semibold">
            Total Users: {filteredUsers.length}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-[#D1A054] text-white">
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td>{index + 1 + currentPage * usersPerPage}</td>
                <td>
                  <img
                    src={user.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "volunteer"
                    ? "Volunteer"
                    : "User"}
                </td>
                <td>
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-sm btn-ghost">
                      <FaEllipsisV />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button
                          onClick={() => handleStatusToggle(user)}
                          className={`btn ${
                            user.status === "active"
                              ? "btn-error"
                              : "btn-success"
                          }`}
                        >
                          {user.status === "active" ? "block" : "unblock"}
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleMakeAdmin(user)}>
                          Make Admin
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleMakeVolunteer(user)}>
                          Make Volunteer
                        </button>
                      </li>
                      <li>
                        <button
                          className="text-red-600"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex justify-center gap-2"}
          activeClassName={"btn btn-primary"}
          pageLinkClassName={"btn btn-sm"}
          previousLinkClassName={"btn btn-sm"}
          nextLinkClassName={"btn btn-sm"}
        />
      </div>
    </div>
  );
};

export default AllUsers;
