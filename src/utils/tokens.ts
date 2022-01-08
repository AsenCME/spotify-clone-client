const keyPrefix = "@spotify-app-asen/";

export const saveTokens = (a: string, r: string, e: number | string) => {
  localStorage.setItem(keyPrefix + "access-token", a);
  localStorage.setItem(keyPrefix + "refresh-token", r);
  localStorage.setItem(keyPrefix + "expires-at", String(e));
};
export const getHeaders = () => {
  const a = localStorage.getItem(keyPrefix + "access-token") || "";
  const r = localStorage.getItem(keyPrefix + "refresh-token") || "";
  const e = localStorage.getItem(keyPrefix + "expires-at") || "";
  return {
    "Content-Type": "application/json",
    "access-token": a,
    "refresh-token": r,
    "expires-at": e,
  };
};
export const removeTokens = () => {
  localStorage.removeItem(keyPrefix + "access-token");
  localStorage.removeItem(keyPrefix + "refresh-token");
  localStorage.removeItem(keyPrefix + "expires-at");
};
