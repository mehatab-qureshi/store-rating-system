import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../utils/auth";

const OwnerDashboard = () => {
  const [data, setData] = useState(null);
  const [ratings, setRatings] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/owner/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRatingsUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/owner/ratings-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRatings(res.data.ratings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRatingsUsers();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h1>🏪 Store Owner Dashboard</h1>

        <button onClick={logout}> Logout </button>

        {data.length === 0 ? (
          <p>No store found</p>
        ) : (
          data.map((store) => (
            <div
              key={store.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "8px",
              }}
            >
              <h2>📌 {store.name}</h2>

              <p>⭐ Average Rating: {store.average_rating}</p>
              <p>👥 Total Ratings: {store.total_ratings}</p>
            </div>
          ))
        )}
      </div>

      <h2>Users Who Rated My Store</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.rating}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerDashboard;
