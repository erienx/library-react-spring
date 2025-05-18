import { useEffect, useState } from "react";
import { User } from "../../types/types";

const useFetchMembersByFields = (token: string | undefined | null, orderType: string, email: string = "",firstName: string = "",lastName: string = "") => {
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    if (!(email || firstName || lastName) || !token || !orderType) {
      return;
    }
    setLoading(true);
    try {
        const params = new URLSearchParams();
      if (email) params.append("email", email);
      if (firstName) params.append("firstName", firstName);
      if (lastName) params.append("lastName", lastName);
      
      const url = `http://localhost:8080/members/search?${params.toString()}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load member");
      const data: User[] = await res.json();
      setMembers(data);
    } catch (err) {
      setErrorMsg("Failed to load members");
      console.error("Error fetching members:", err);
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