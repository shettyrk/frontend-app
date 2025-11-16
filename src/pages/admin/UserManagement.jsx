import React, { useState } from "react";
import { User, Shield, Trash2, Search } from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ramakrishna Shetty",
      email: "rama@candles.com",
      role: "Admin",
      joined: "2025-10-10",
    },
    {
      id: 2,
      name: "Viola Pinto",
      email: "viola@candles.com",
      role: "Customer",
      joined: "2025-10-21",
    },
    {
      id: 3,
      name: "Rashik S",
      email: "rashik@candles.com",
      role: "Customer",
      joined: "2025-11-02",
    },
  ]);

  const [search, setSearch] = useState("");

  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-amber-700">User Management</h1>

      {/* Search */}
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-amber-100">
        <Search className="text-amber-700" size={20} />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-gray-700"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-amber-100 overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-amber-50 text-gray-800">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-amber-50 transition"
              >
                <td className="px-6 py-3 font-medium text-gray-800">
                  {user.id}
                </td>
                <td className="px-6 py-3 flex items-center gap-2">
                  <User className="text-amber-600" size={18} /> {user.name}
                </td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                    className={`border rounded-md px-2 py-1 text-sm ${
                      user.role === "Admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <option>Customer</option>
                    <option>Admin</option>
                  </select>
                </td>
                <td className="px-6 py-3">{user.joined}</td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No users found.
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <User className="text-blue-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Customers</p>
            <p className="text-xl font-bold text-gray-800">
              {users.filter((u) => u.role === "Customer").length}
            </p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <Shield className="text-green-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Admins</p>
            <p className="text-xl font-bold text-gray-800">
              {users.filter((u) => u.role === "Admin").length}
            </p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-amber-500 p-5 rounded-lg shadow-sm flex items-center gap-4">
          <User className="text-amber-500" size={32} />
          <div>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-xl font-bold text-gray-800">{users.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
