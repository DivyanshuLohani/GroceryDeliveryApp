import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw Error(
      "Auth Context is undefiend did you forget to wrap the app in AuthProvider"
    );

  return context;
}
