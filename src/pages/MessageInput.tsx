import React from "react";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
  placeholder: string;
}

export const MessageInput: React.FC<Props> = ({
  handleChange,
  name,
  value,
  placeholder,
}) => {
  return (
    <div>
      <textarea
        onChange={(event) => handleChange(event)}
        value={value}
        name={name}
        className="text-lg pl-3 w-72 border-gray-300 h-28 resize-none text-gray-900 rounded-lg outline-0 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
