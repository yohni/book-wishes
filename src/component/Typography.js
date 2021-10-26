import classNames from 'classnames';
import React from 'react';

export const H1 = ({ children, className }) => {
  return <h1 className={classNames('typo-h1', className)}>{children}</h1>;
};

export const H2 = ({ children, className }) => {
  return <h2 className={classNames('typo-h2', className)}>{children}</h2>;
};

export const Subtitle = ({ children, className }) => {
  return <p className={classNames('typo-sub', className)}>{children}</p>;
};
