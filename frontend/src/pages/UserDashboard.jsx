import Stores from "./Stores";
import { logout } from "../utils/auth";

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>

      <button onClick={logout}> Logout </button>

      {/* reuse same stores page */}
      <Stores />
    </div>
  );
};

export default UserDashboard;
