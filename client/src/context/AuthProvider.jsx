import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("User") !== null;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/authuser');
    }
  }, [isLoggedIn, navigate]); // depend on isLoggedIn and navigate

  return children; // render the children outside useEffect
};

export default AuthProvider;
