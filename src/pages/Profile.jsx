import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    // ✅ For now, just update localStorage and context
    const updatedUser = { ...user, name, email };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    window.location.reload(); // refresh to update context
  };

  if (!user)
    return (
      <div className="p-8 text-center text-gray-600">
        Please log in to view your profile.
      </div>
    );

  return (
    <div className="min-h-screen bg-amber-50 flex justify-center items-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center">
          My Profile
        </h1>

        {!isEditing ? (
          <>
            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-sm">Name</label>
                <p className="text-gray-800 font-semibold">{user.name}</p>
              </div>
              <div>
                <label className="text-gray-500 text-sm">Email</label>
                <p className="text-gray-800 font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
