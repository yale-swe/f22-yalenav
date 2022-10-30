import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthData } from "../../types";
import { BACKEND } from "../constants";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
};

// Specify the type to be other React components for the props
interface Props {
  children?: ReactNode;
}

// Create the Auth Context with the AuthContextData type specified.
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();

  // The AuthContext start with loading equals true
  const [loading, setLoading] = useState(true);

  // Every time the App first opens, the provider calls the loadStorageData to retrieve the data stored locally.
  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem("@AuthData");
      if (authDataSerialized) {
        // If there are data, it's converted to an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      // Update loading state to be false because retrieval has finished.
      setLoading(false);
    }
  }

  const signIn = async () => {
    // Create a return URL to redirect upon login attempt
    const retPoint = AuthSession.makeRedirectUri();

    // Create the endpoint we will ping to start the CAS authentication flow
    const endPoint = `${BACKEND}/cas?redirect=${retPoint}`;

    // Start an authentication session. This creates the popup with the Yale CAS page and prompts user to sign in.
    let result = await AuthSession.startAsync({
      authUrl: endPoint,
      returnUrl: retPoint,
    });

    if (result.type == "success") {
      // NetId is passed back through query parameters upon a successful authentication process.
      const newAuthData = { netId: result.params.netId };

      // Set the data in the context which is shared among the other components.
      setAuthData(newAuthData);

      // Persist the data in local storage so the user does not need to login ever time they want to use the app.
      AsyncStorage.setItem("@AuthData", JSON.stringify(newAuthData));
    }
  };

  const signOut = async () => {
    axios.get<{ success: Boolean }>(`${BACKEND}/logout`).then(({ data }) => {
      if (data.success) {
        console.log("Logged out successfully");
      }
    });

    //Remove data from context, so the App can be notified
    setAuthData(undefined);

    //Remove the data from Local storage. User will have to sign in.
    await AsyncStorage.removeItem("@AuthData");
  };

  return (
    // All children will have access to the following values.
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// A custom hook to facilitate the access to the AuthContext and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };

