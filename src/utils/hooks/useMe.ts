import { useQuery } from "react-query";
import { User } from "../models";

export default function useMe(enabled = true) {
  const { data, isLoading, refetch } = useQuery<User>("/me", { enabled });
  return { me: data, isLoading, getMe: refetch };
}
