import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import axios from "axios";
import { startAsync } from "expo-auth-session";
import React from "react";
import { AuthProvider, useAuth } from "../src/contexts/Auth";
import SignInScreen from "../src/screens/SignInScreen";
import UserProfile from "../src/screens/UserProfile";
import { getUser } from "../src/utils";
import { userNoCourses } from "./mockData/usersMock";

let mockNavigation: any = { navigate: jest.fn() };
const mockRoute: any = {};
const result: any = {
  type: "success",
  params: {
    netId: "abc123",
  },
};

jest.mock("expo-auth-session", () => ({
  startAsync: jest.fn(),
  makeRedirectUri: jest.fn(),
}));

jest.mock("../src/utils", () => ({
  getUser: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

const renderScreen = async (component: any) => {
  let screen: any;
  await act(async () => {
    await waitFor(() => {
      screen = render(<AuthProvider>{component}</AuthProvider>);
    });
  });
  return screen;
};

describe("Testing the Auth Component", () => {
  test("Component not in AuthProvider calls useAuth", async () => {
    // Create component that calls useAuth but is not in AuthProvider
    const Component = () => {
      useAuth();
      return <></>;
    };

    // mock away error log
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => jest.fn());

    // Auth.tsx should throw the following error
    expect(() => {
      render(<Component />);
    }).toThrow("useAuth must be used within an AuthProvider");

    // restore
    consoleError.mockRestore();
  });

  test("Non-logged in user clicks on the sign in button and successfully logs into CAS", async () => {
    // Mock expo-auth-session's startAsync function and return a successful login message
    jest.mocked(startAsync).mockResolvedValue(result);

    // Render the Sign In screen
    const signInScreen = (
      <SignInScreen navigation={mockNavigation} route={mockRoute} />
    );
    const screen = await renderScreen(signInScreen);

    // Pressing the Sign In Button will call a setState so we need to wrap in an act() call to avoid jest errors
    await act(async () => {
      await waitFor(async () => {
        fireEvent.press(await screen.getByText("Sign In"));
      });
    });

    // Successful logins call AsyncStorage.setItem with the user's netId
    expect(AsyncStorage.setItem).toBeCalledWith(
      "@AuthData",
      JSON.stringify({ netId: result.params.netId })
    );
  });

  test("Logged in user signs out", async () => {
    // Spy on AsyncStorage.removeItem because this is called at the end of a successful log out process
    jest.spyOn(AsyncStorage, "removeItem");

    // getUser is called inside ProfileScreen and expects a defined user to be returned or else it renders an error message
    jest.mocked(getUser).mockResolvedValue(userNoCourses);

    // axios.get is called inside the signOut function inside Auth.tsx and expects a successful message
    jest.spyOn(axios, "get").mockResolvedValue({ data: { success: true } });

    // Render the UserProfileScreen
    const userProfileScreen = (
      <UserProfile navigation={mockNavigation} route={mockRoute} />
    );
    const screen: any = await renderScreen(userProfileScreen);

    // Pressing this will call a setState so we need to wrap in an act() call
    await act(async () => {
      await waitFor(async () => {
        fireEvent.press(await screen.getByText("Sign Out"));
      });
    });

    expect(AsyncStorage.removeItem).toBeCalledWith("@AuthData");
  });
});
