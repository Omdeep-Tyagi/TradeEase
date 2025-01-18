import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import user from "../images/user.png";

const Menu = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("User");
  const [loading, setLoading] = useState(true);  // Loading state
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        redirectToLogin();
        return;
      }

      try {
        const { data } = await axios.post(
          "https://tradeease.onrender.com",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setUsername(user);
          toast(`Hello ${user}`, { position: "top-right" });
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error("Verification failed:", error);
        handleInvalidToken();
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  // Logout and redirect
  const Logout = () => {
    removeCookie("token");
    window.location.href = "https://comfy-khapse-9901c9.netlify.app";
  };

  // Redirect to login if token is invalid or missing
  const redirectToLogin = () => {
    removeCookie("token");
    window.location.href = "https://comfy-khapse-9901c9.netlify.app/login";  // External redirect
  };

  // Handle invalid token from API response
  const handleInvalidToken = () => {
    toast.error("Session expired. Redirecting...");
    redirectToLogin();
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // Show loader while verifying token
  if (loading) return <div>Loading...</div>;

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar"><img src={user} alt="Avatar" style={{width:"100%",height:"100%"}}/></div>
          <p className="username">{username}</p>
          <button onClick={Logout} style={{marginLeft:"10px"}}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Menu;