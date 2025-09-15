import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("loggedInUser");
  console.log(isAuth);
  if (!isAuth) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
