//this is a mock backend 
import {User} from "../types/types"

const testUser: User ={
    id: 1,
    email: 'test@em.com',
    firstName: 'Fname',
    lastName: 'Lname',
    role: 'user',
};


// mockSession token simulates http only cookie from backend
export async function getUser() {
    await new Promise((resole) => setTimeout(resole,200));

    const savedToken = localStorage.getItem("mockSessionToken");

  if (!savedToken) {
    throw new Error("Not authenticated");
  }

  const authToken = generateAuthToken();

  return {
    status: 200,
    data: {
      authToken,
      user: testUser,
    },
  };
}
export async function login(){
    await new Promise((resolve) => setTimeout(resolve,1000));

    const authToken = generateAuthToken();

  localStorage.setItem("mockSessionToken", authToken);

  return {
    status: 200,
    data: {
      authToken,
      user: testUser,
    },
  };
}

export async function logout(){
    await new Promise((resolve) => setTimeout(resolve,500));
    localStorage.removeItem("mockSessionToken");
}

function generateAuthToken() {
    return Math.random().toString(36).substring(2);
}

