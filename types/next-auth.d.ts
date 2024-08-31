import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      fullName: string;
      email: string;
      isSocialAuth: string;
      address: string;
      phone: string;
      role: string;
      avatar: string;
    };
    accessToken: string;
    refreshToken: string;
    expireIn: number;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      _id: string;
      fullName: string;
      email: string;
      isSocialAuth: string;
      address: string;
      phone: string;
      role: string;
      avatar: string;
    };
    accessToken: string;
    refreshToken: string;
    expireIn: number;
  }
}
