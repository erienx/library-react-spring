import { useState } from "react";

const useCommitOrder = (authToken: string | null | undefined, onSuccess?: () => void) => {
  const [commitLoading, setCommitLoading] = useState(false);
  const [commitMessage, setCommitMessage] = useState<string | null>(null);

  const commitOrder = async () => {
    if (!authToken) {
      setCommitMessage("You must be logged in to commit an order.");
      return;
    }

    try {
      setCommitLoading(true);
      setCommitMessage(null);

      const res = await fetch("http://localhost:8080/orders/commit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("order commit failed.");
      }

      await res.json();
      setCommitMessage("order committed successfully!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setCommitMessage("failed to commit order.");
    } finally {
      setCommitLoading(false);
    }
  };

  return { commitOrder, commitLoading, commitMessage };
};

export default useCommitOrder;