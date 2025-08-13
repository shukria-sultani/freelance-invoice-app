// getting and setting data to local storage

export const getStoredData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

export const setStoredData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
