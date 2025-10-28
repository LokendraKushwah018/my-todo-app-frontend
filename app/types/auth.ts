export type User = {
  id: number;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  image?: string;
};

export type LoginResponse = User & {
  accessToken?: string;  // DummyJSON new shape
  refreshToken?: string;
  token?: string;        // fallback older shape
};
