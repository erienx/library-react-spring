
export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8080/members/login",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({email,password}),
});
if (!response.ok){
  throw new Error("login failed");
}

const data = await response.json();



  return data.accessToken;
}

export async function refreshToken() {
  const response = await fetch("http://localhost:8080/members/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 401) {
      return Promise.reject(new Error("no refresh token")); //if logged out
    }

    const errorText = await response.text();
    console.error("refresh error", response.status, errorText);
    return Promise.reject(new Error("Failed to refresh token"));
  }

  const data = await response.json();
  return data.accessToken;
}


export async function logout() {
const response = await fetch("http://localhost:8080/members/logout",{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  credentials: "include",
});
if (!response.ok){
  throw new Error("logout failed");
}


}
