import classNames from 'classnames';
import React from 'react';

const Modal = ({
  children,
  text,
  actionText,
  handleClick,
  className,
  noAction = false,
}) => {
  return (
    <>
      <label
        for="bookwish__modal"
        className={classNames('btn btn-primary modal-button', className)}
      >
        {text || 'Click me'}
      </label>
      <input type="checkbox" id="bookwish__modal" className="modal-toggle" />
      <div className="modal">
        <label for="bookwish__modal" className="absolute inset-0" />
        <div className="modal-box">
          {children}
          {!noAction && (
            <div className="modal-action">
              {actionText && (
                <label
                  for="bookwish__modal"
                  onClick={handleClick}
                  className="btn btn-accent bg-bookwishes border-none"
                >
                  {actionText}
                </label>
              )}
              <label for="bookwish__modal" className="btn">
                Close
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
