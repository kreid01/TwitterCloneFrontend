import React, { useContext, useState } from "react";

const CommentContext = React.createContext<boolean | null>(null);
const SetCommentContext = React.createContext<{ (): void } | null>(null);
const CommentUpdateContext = React.createContext<{ (): void } | null>(null);

export const useCommentContext = () => {
  return useContext(CommentContext);
};

export const useUpdateCommentContext = () => {
  return useContext(CommentUpdateContext);
};

export const useSetCommentContext = () => {
  return useContext(SetCommentContext);
};

interface Props {
  children: React.ReactNode;
}

export const CommentProvider = ({ children }: Props) => {
  const [isCommenting, setIsCommenting] = useState(false);

  const toggleIsCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  };

  const setCommentingTrue = () => {
    setIsCommenting(true);
  };

  return (
    <SetCommentContext.Provider value={setCommentingTrue}>
      <CommentUpdateContext.Provider value={toggleIsCommenting}>
        <CommentContext.Provider value={isCommenting}>
          {children}
        </CommentContext.Provider>
      </CommentUpdateContext.Provider>
    </SetCommentContext.Provider>
  );
};
