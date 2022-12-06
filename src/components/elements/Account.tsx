import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

const Account = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div className="user-fixed-position">
      <a
        id="user-account"
        className={`user-profile ${showMenu && "focus"}`}
        onClick={handleMenuClick}
      >
        <svg
          width="1.5em"
          height="1.5em"
          viewBox="0 0 16 16"
          className="bi bi-person-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          />
        </svg>
      </a>
      {showMenu && (
        <div className="account-card shadow-lg p-3 mb-5 bg-white rounded user-profile">
          <h5>Sam</h5>
          <ul className="list-group list-group-flush">
            <Link to="/account-settings">Account settings</Link>
            <a href="/" onClick={() => alert("signed out")}>
              Sign out
            </a>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Account;
