import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-600 z-50 bg-opacity-50 flex justify-center items-center">
      <div className="animate-spin h-8 w-8 border-t-4 border-r-4 border-solid border-bookwishes rounded-full" />
    </div>
  );
};

export default Spinner;
