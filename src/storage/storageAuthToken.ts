import AsyncStorage from "@react-native-async-storage/async-storage";

import { authTokenStorage } from "storage/storageConfig";

export async function storageAuthTokenSave(token: string) {
  await AsyncStorage.setItem(authTokenStorage, token);
}

export async function storageAuthTokenGet() {
  const token = await AsyncStorage.getItem(authTokenStorage);

  return token;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(authTokenStorage);
}
