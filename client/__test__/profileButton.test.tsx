import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import { AuthContext, AuthProvider } from "../src/contexts/Auth";
import { ProfileButton } from "../src/components/shortcut/ProfileButton";
import {
  mockLoggedInUser,
  mockLoggedOutUser,
} from "./mockData/authContextMock";

let mockNavigation: any = { navigate: jest.fn() };

const mockRoute: any = {};

afterEach(() => {
  jest.clearAllMocks();
});

describe("Testing the Auth Component", () => {
  test("Logged in user should have their netId in the button", async () => {
    let screen: any;
    await act(async () => {
      await waitFor(() => {
        screen = render(
          <AuthProvider>
            <AuthContext.Provider value={mockLoggedInUser}>
              <ProfileButton navigation={mockNavigation} route={mockRoute} />
            </AuthContext.Provider>
          </AuthProvider>
        );
      });
    });

    expect(screen.getByText(mockLoggedInUser.authData.netId)).toBeTruthy();
  });

  test("Non-logged in should see 'sign in' in the button", async () => {
    let screen: any;
    await act(async () => {
      await waitFor(() => {
        screen = render(
          <AuthProvider>
            <AuthContext.Provider value={mockLoggedOutUser}>
              <ProfileButton navigation={mockNavigation} route={mockRoute} />
            </AuthContext.Provider>
          </AuthProvider>
        );
      });
    });

    expect(screen.getByText("Sign In")).toBeTruthy();
  });

  test("Logged in user clicks button", async () => {
    let screen: any;
    await act(async () => {
      await waitFor(() => {
        screen = render(
          <AuthProvider>
            <AuthContext.Provider value={mockLoggedInUser}>
              <ProfileButton navigation={mockNavigation} route={mockRoute} />
            </AuthContext.Provider>
          </AuthProvider>
        );
      });
    });

    const button = screen.getByText(mockLoggedInUser.authData.netId);
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("UserProfile");
  });

  test("Non-logged in user clicks button", async () => {
    let screen: any;
    await act(async () => {
      await waitFor(() => {
        screen = render(
          <AuthProvider>
            <AuthContext.Provider value={mockLoggedOutUser}>
              <ProfileButton navigation={mockNavigation} route={mockRoute} />
            </AuthContext.Provider>
          </AuthProvider>
        );
      });
    });

    const button = screen.getByText("Sign In");
    expect(button).toBeTruthy();
    fireEvent.press(button);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("SignInScreen");
  });
});
