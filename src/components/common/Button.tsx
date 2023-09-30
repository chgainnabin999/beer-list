import React, { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit';
  className?: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const buttonClass = `text-white ${props.isDisabled
      ? 'bg-gray-300'
      : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'
    } px-5 py-2.5 focus:outline-none rounded-md ${props.className ?? ''}`;

  return (
    <button
      role="button"
      type={props.type || 'button'}
      className={buttonClass}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
