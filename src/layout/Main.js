import React from 'react';
import Navbar from '../component/Navbar';

const Main = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-16">{children}</div>
    </div>
  );
};

export default Main;
