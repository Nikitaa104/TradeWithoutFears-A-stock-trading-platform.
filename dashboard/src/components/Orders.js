import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
useEffect(() => {
  const verifyUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/verify", {
        withCredentials: true
      });

      if (!res.data.status) {
        window.location.href = "http://localhost:3000/login";
      }
    } catch (err) {
      window.location.href = "http://localhost:3000/login";
    }
  };

  verifyUser();
}, []);
  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;
