// Set localstorage data
export const setLocalStorageData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Get new localstorage data
export const getLocalStorageData = (key) => {
  const local = JSON.parse(localStorage.getItem(key));
  return local ? local : null;
};

// Remove localstorage data
export const removeLocalStorageData = (key) => localStorage.removeItem(key);
