import React, { useContext, useState, createContext } from "react";

const CommentContext = createContext<boolean | null>(false);
const UpdateCommentContext = createContext<{ (): void } | null>(null);

export const useIsCommenting = () => {
  return useContext(CommentContext);
};

export const useUpdateIsCommenting = () => {
  return useContext(UpdateCommentContext);
};

export const CommentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCommenting, setIsCommenting] = useState(false);

  const toggleIsCommenting = () => {
    setIsCommenting((isCommenting) => !isCommenting);
  };

  return (
    <CommentContext.Provider value={isCommenting}>
      <UpdateCommentContext.Provider value={toggleIsCommenting}>
        {children}
      </UpdateCommentContext.Provider>
    </CommentContext.Provider>
  );
};
