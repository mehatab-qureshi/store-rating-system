import { useEffect, useState } from "react";
import api from "../api/axios";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({}); // store wise rating storeing
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [myRatings, setMyRatings] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get(`/store?search=${search}&sort=${sort}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStores(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRating = async (storeId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/rating/my-rating/${storeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyRatings((prev) => ({
        ...prev,
        [storeId]: res.data.rating,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [search, sort]);

  //calling ratings after stores loaded
  useEffect(() => {
    stores.forEach((store) => {
      fetchMyRating(store.id);
    });
  }, [stores]);

  // rating change handler
  const handleChange = (storeId, value) => {
    setRatings({
      ...ratings,
      [storeId]: value,
    });
  };

  // submit rating
  const submitRating = async (storeId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/rating",
        {
          store_id: storeId,
          rating: ratings[storeId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Rating submitted");

      fetchStores(); // refresh
      fetchMyRating(storeId);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ display: "grid", gap: "10px" }}>
      {loading ? <p>Loading stores...</p> : null}
      <h1>Stores</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search store..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* SORT */}
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="asc">Rating Low → High</option>
        <option value="desc">Rating High → Low</option>
      </select>

      {stores.map((store) => (
        <div
          key={store.id}
          style={{ border: "1px solid black", margin: 10, padding: 10 }}
        >
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p>⭐ Avg Rating: {store.average_rating}</p>

          <p>📝 My Rating: {myRatings[store.id] || "Not Rated"}</p>

          {/*Rating Input */}
          <input
            type="number"
            min="1"
            max="5"
            value={ratings[store.id] || ""}
            onChange={(e) => handleChange(store.id, e.target.value)}
          />

          <button onClick={() => submitRating(store.id)}>Submit Rating</button>
        </div>
      ))}
    </div>
  );
};

export default Stores;
