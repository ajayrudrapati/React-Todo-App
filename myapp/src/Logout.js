import React from 'react';

const Logout = ({ handleLogout }) => {
  const handleLogoutClick = () => {
    // Perform logout logic
    handleLogout();
  };

  return (
    <div>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Logout;
