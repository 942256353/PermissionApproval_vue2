const tokenKey = 'token';

//set
export const setToken = (data)=>sessionStorage.setItem(tokenKey,data);

//get
export const getToken = ()=>sessionStorage.getItem(tokenKey);

//remove
export const removeToken = ()=>sessionStorage.removeItem(tokenKey);
