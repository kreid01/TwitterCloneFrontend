import React from "react";

interface Props {
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
  placeholder: string;
}

export const UserTextInput: React.FC<Props> = ({
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
      {value.length < 1 && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          Please give your post text
        </p>
      )}
    </div>
  );
};
