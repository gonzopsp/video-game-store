import { useEffect, useState } from "react";
import type { users } from "../types/types";
import axios from "axios";



export function useUsers() {
  const [users, setUsers] = useState<users[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token"); 
  const api = axios.create({
    baseURL: "http://localhost:4000/api/users",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/");
      console.log('Fetched users:', res.data);
      setUsers(res.data);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (user: Omit<users, "email">) => {
    try {
      const res = await api.post("/users", user);
      setUsers((prev) => [...prev, res.data]);
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Error creating user");
    }
  };

  // ✏️ Update user
  const updateUser = async (email: string, updatedUser: Partial<users>) => {
    try {
      const res = await api.put(`/${email}`, updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u.email === email ? { ...u, ...res.data } : u))
      );
      return res.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Error updating user");
    }
  };


  const deleteUser = async (email: string) => {
    try {
      await api.delete(`/${email}`);
      setUsers((prev) => prev.filter((u) => u.email !== email));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Error deleting user");
    }
  };

  useEffect(() => {
       if (!token) {
      setError("No token found, please login");
      setLoading(false);
      return;
    }
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
