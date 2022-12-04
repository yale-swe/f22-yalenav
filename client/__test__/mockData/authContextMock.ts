export const mockLoggedInUser = {
  loading: false,
  isAuthenticated: true,
  authData: {
    netId: "abc123",
  },
  signIn: async () => {},
  signOut: async () => {},
};

export const mockLoggedOutUser = {
  loading: false,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
};
