import { api } from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TUser } from "@/types";
import {
  ASYNCSTORAGE_TOKEN,
  ASYNCSTORAGE_USER_INFO,
} from "@/constants/asycnStorage";

interface IAuth {
  access: string;
  refresh: string;
}

export interface AuthContextValue {
  auth: IAuth | null;
  setAuth: Dispatch<SetStateAction<IAuth | null>>;
  userInfo: TUser | null;
  setUserInfo: Dispatch<SetStateAction<TUser | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  getUserData: () => Promise<TUser | null>;
  logout: () => void;
  checkLogin: () => void;
  ready: boolean;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
  onAuthChanged: (auth: boolean) => void;
}

export const AuthProvider = ({
  children,
  onAuthChanged,
}: AuthProviderProps) => {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const [userInfo, setUserInfo] = useState<TUser | null>(null);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if (auth) {
      getUserData();
    }
    onAuthChanged(!!auth);
  }, [auth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await api.post(`/users/login/`, { email, password });
      setAuth(res.data);
      await AsyncStorage.setItem(ASYNCSTORAGE_TOKEN, JSON.stringify(res.data));
      return true;
    } catch (e) {
      console.log(`Error in login: ${e}`);
    }
    return false;
  };

  const getUserData = async (): Promise<TUser | null> => {
    if (!auth) return null;
    try {
      const res = await api.get("/users/user/", {
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      });

      setUserInfo(res.data);
      await AsyncStorage.setItem(
        ASYNCSTORAGE_USER_INFO,
        JSON.stringify(res.data)
      );
      return res.data;
    } catch (e) {
      console.error(`Error in getUserData: ${e}`);
    }
    return null;
  };

  const logout = (): void => {
    setUserInfo(null);
    setAuth(null);
    AsyncStorage.clear();
  };

  const checkLogin = async (): Promise<void> => {
    try {
      const storedAuth = await AsyncStorage.getItem(ASYNCSTORAGE_TOKEN);
      const parsedAuth: IAuth | null = storedAuth
        ? JSON.parse(storedAuth)
        : null;

      if (parsedAuth?.access) {
        const storedUserInfo = await AsyncStorage.getItem(
          ASYNCSTORAGE_USER_INFO
        );
        const parsedUserInfo: TUser | null = storedUserInfo
          ? JSON.parse(storedUserInfo)
          : null;

        if (parsedUserInfo) {
          setAuth(parsedAuth);
          setUserInfo(parsedUserInfo);
          // Set headers to have the access token when request is made
          api.defaults.headers.common.Authorization = `Bearer ${parsedAuth.access}`;
        }
      }
    } catch (e) {
      console.log(`Error in checkLogin: ${e}`);
    } finally {
      setReady(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userInfo,
        setUserInfo,
        login,
        getUserData,
        logout,
        checkLogin,
        ready,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
