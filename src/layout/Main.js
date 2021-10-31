import classNames from 'classnames';
import React from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';

const Main = ({ children, className }) => {
  return (
    <>
      <Navbar />
      <div className={classNames('pt-16 min-h-screen pb-9', className)}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Main;
