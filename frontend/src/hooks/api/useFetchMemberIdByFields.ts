import { useEffect, useState } from "react";
import { User } from "../../types/types";

const useFetchMembersByFields = (token: string | undefined | null, orderType: string, email: string = "",firstName: string = "",lastName: string = "") => {
  const [members, setmembersIds] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (!(email || firstName || lastName) || !token || !orderType) {
      return;
    }
    setLoading(true);
    try {
        var url = `http://localhost:8080/members/search?${email ? `email=${email}&` : ""}${firstName ? `firstName=${firstName}&` : ""}${lastName ? `lastName=${lastName}` : ""}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data: User[] = await res.json();
      setmembersIds(data);
    } catch (err) {
      setErrorMsg("Failed to load orders");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [email,firstName,lastName, token, orderType]);

  return { members, errorMsg, loading };
};

export default useFetchMembersByFields;