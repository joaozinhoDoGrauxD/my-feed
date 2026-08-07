export type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
};