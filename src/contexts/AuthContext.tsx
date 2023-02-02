import { createContext, ReactNode, useEffect, useState } from "react";

import {
  storageAuthTokenGet,
  storageAuthTokenSave,
  storageAuthTokenRemove,
} from "storage/storageAuthToken";
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "storage/storageUser";

import { api } from "services/api";

import { UserDTO } from "dtos/UserDTO";

type AuthContextDataProps = {
  user: UserDTO;
  isLoading: boolean;
  updateUserProfile: (user: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoading, setIsLoading] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    setUser(userData);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoading(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post<{ user: UserDTO; token: string }>(
        "/sessions",
        {
          email,
          password,
        }
      );

      if (data.user && data.token) {
        setIsLoading(true);

        await storageUserAndTokenSave(data.user, data.token);
        await userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUser() {
    try {
      setIsLoading(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if (userLogged && token) {
        await userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    try {
      setIsLoading(true);

      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, updateUserProfile, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
