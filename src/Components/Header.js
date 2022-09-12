import {Button}  from "antd";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { auth, db,logout } from "./Firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="header">
      {/* Shows Qkart title image */}
      <div className="header-title">
        TrialCase
      </div>

      {/* Display links based on if the user's logged in or not */}
      <div className="header-action">
        {user ? (
          <>
            <div className="header-link">Services</div>
            <div className="header-link">Properties</div>
            <div className="header-link">Company</div>
            <div className="header-link">AboutUs</div>
            <div className="header-info">
              {name}
            </div>
            <Button type="primary" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <div className="header-link">Services</div>
            <div className="header-link">Properties</div>
            <div className="header-link">Company</div>
            <div className="header-link">AboutUs</div>

            <div className="header-link">
              <Button type="primary">SignIn</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
