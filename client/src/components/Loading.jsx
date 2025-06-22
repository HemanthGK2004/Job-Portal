import React from 'react';

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <div className='w-16 h-16 border-4 border-gray-300 rounded-full border-t-blue-500 animate-spin'></div>
      <p className='mt-4 text-lg font-medium text-gray-500'>Loading...</p>
    </div>
  );
};

export default Loading;
