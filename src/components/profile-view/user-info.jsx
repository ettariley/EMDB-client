import React from "react";
import './profile-view.scss';

export function UserInfo({userInfo}) {
  return (
    <div className="user-info">
      <h3>Your Info</h3>
      <h4>Username: {userInfo.Username}</h4>
      <h4>Email: {userInfo.Email}</h4>
    </div>
  );
}