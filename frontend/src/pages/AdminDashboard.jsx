import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [storeSearch, setStoreSearch] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/admin/users?search=${search}&role=${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users);
    } catch (error) {
      alert(error.response?.data?.message || "Dashboard error");
    }
  };

  const fetchStores = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get(`/admin/stores?search=${storeSearch}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStores(res.data.stores);
  };

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}> Logout </button>

      <h2>Dashboard Stats</h2>

      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>

      <h2>Users List</h2>

      <input
        type="text"
        placeholder="Search by name/email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">All Roles</option>
        <option value="ADMIN">ADMIN</option>
        <option value="USER">USER</option>
        <option value="STORE_OWNER">STORE_OWNER</option>
      </select>

      <button onClick={fetchUsers}>Search</button>

      <h2>user table</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Stores List</h2>

      <input
        type="text"
        placeholder="Search Store"
        value={storeSearch}
        onChange={(e) => setStoreSearch(e.target.value)}
      />

      <button onClick={fetchStores}>Search Store</button>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.average_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
