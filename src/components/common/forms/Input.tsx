import React, { ChangeEvent, FocusEvent } from 'react';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  isTextArea?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  isTextArea,
}) => (
  <>
    {isTextArea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
          } rounded`}
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
          } rounded`}
      />
    )}

    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </>
);

export default Input;
