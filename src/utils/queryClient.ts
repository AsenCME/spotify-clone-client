import { navigate } from "@reach/router";
import { QueryClient, useMutation } from "react-query";
import { getHeaders, saveTokens } from "./tokens";
const base = process.env.BASE_URL || "http://localhost:4000";

const onError = (e: any) => {
  const err = e as Error;
  if ("message" in err) {
    if (err.message === "unauth") {
      navigate("/");
      alert("Unauthorized");
    } else if (err.message !== "invalid_token") alert(err.message);
  }
};

export const queryFn = async <T extends any = any>(key: string): Promise<T> => {
  const headers = getHeaders();
  const query = await fetch(`${base}${key}`, { headers });
  if (query.headers.get("access-token"))
    saveTokens(query.headers.get("access-token") || "", headers["refresh-token"], query.headers.get("expires-at") || 0);
  if (query.status === 401) throw new Error("unauth");
  if (query.status > 299) throw new Error(await query.text());
  return await query.json();
};

type Mutation = [string, any, "POST" | "PUT", boolean?];
export const mutationFn = async ([path, body, method = "POST", mutlipart = false]: Mutation) => {
  const headers = getHeaders();
  const mutation = await fetch(`${base}${path}`, {
    method,
    body: mutlipart ? body : JSON.stringify(body),
    headers: {
      ...headers,
      "Content-Type": mutlipart ? "multipart/form-data" : "application/json",
    },
  });
  if (mutation.headers.get("access-token"))
    saveTokens(mutation.headers.get("access-token") || "", headers["refresh-token"], mutation.headers.get("expires-at") || 0);
  if (mutation.status === 401) throw new Error("unauth");
  if (mutation.status > 299) throw new Error(await mutation.text());
  return await mutation.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError,
      retry: false,
      staleTime: 5 * 60 * 1000,
      queryFn: async (c) => await queryFn(c.queryKey[0] as string),
    },
  },
});

export default queryClient;

export const useMutationFn = () => useMutation(mutationFn);
