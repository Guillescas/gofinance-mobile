import React, {
  useContext,
  ReactNode,
  createContext,
  ReactElement,
  useState,
  useEffect,
} from 'react';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import { environmentVariables } from '../../config';

interface IAuthProviderProps {
  children: ReactNode;
}

interface IUserData {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: IUserData;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  isUserDataLoading: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProviderProps): ReactElement => {
  const userStorageKey = '@gofinances:user';

  const [user, setUser] = useState<IUserData>({} as IUserData);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: environmentVariables.IOS_CLIENT_ID,
        androidClientId: environmentVariables.ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const loggedUser = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!,
        };

        setUser(loggedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loggedUser));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}`;

        const loggedUser = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(loggedUser);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(loggedUser));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const signOut = async () => {
    setUser({} as IUserData);
    await AsyncStorage.removeItem(userStorageKey);
  };

  useEffect(() => {
    const loadStoragedUserData = async (): Promise<void> => {
      const storagedUserData = await AsyncStorage.getItem(userStorageKey);

      if (storagedUserData) {
        const userLogged = JSON.parse(storagedUserData) as IUserData;
        setUser(userLogged);
      }

      setIsUserDataLoading(false);
    };

    loadStoragedUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        isUserDataLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): IAuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
