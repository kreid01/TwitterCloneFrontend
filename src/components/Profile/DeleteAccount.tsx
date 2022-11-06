import { useGetUser } from "context/UserContext";
import React, { useState } from "react";
import { deleteUser } from "services/users/deleteUser";

export const DeleteAccount: React.FC = () => {
  const [confirmDeletion, setConfirmDeleteion] = useState(false);
  const user = useGetUser();
  const confirmation = () => {
    setConfirmDeleteion(true);
  };

  return (
    <>
      {!confirmDeletion ? (
        <button
          onClick={confirmation}
          className="ml-auto border-red-600 text-red-600 mr-3 rounded-md border-2 px-3 py-1"
        >
          Delete
        </button>
      ) : (
        <button
          className="ml-auto border-red-600 text-red-600 mr-3 rounded-md border-2 px-3 py-1"
          onClick={() => deleteUser(user?.userId as number)}
        >
          Are you sure?
        </button>
      )}
    </>
  );
};
