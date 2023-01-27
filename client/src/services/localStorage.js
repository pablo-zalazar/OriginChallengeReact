// Get user Information from localStorage
export const getUserLogged = () => {
  const local = JSON.parse(localStorage.getItem("userLogged"));
  return local ? local : null;
};

// Add user information to localStorage
export const setUserLogged = (data) => localStorage.setItem("userToken", JSON.stringify(data));
