import classNames from 'classnames';
import React from 'react';
import Navbar from '../component/Navbar';

const Main = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <div className={classNames('pt-16 min-h-screen', className)}>
        {children}
      </div>
    </>
  );
};

export default Main;
