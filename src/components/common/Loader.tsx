import React from 'react';

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-blue-400 w-[1.5rem] h-[1.5rem] ${props.className ?? ''
        }`}
    ></div>
  );
};

export default Loader;
