import { serverApi } from "@/lib/utils";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "email",
          placeholder: "Enter you email",
        },
        password: {
          type: "password",
          placeholder: "Enter you password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return new NextResponse("All field are required");
        }

        const { email, password } = credentials;
        const res = await fetch(`${serverApi}/user/login`, {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (!res.ok) {
          return new NextResponse(user?.message);
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    signOut: "/",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (new Date().getTime() < token.expireIn) return token;

      const res = await fetch(`${serverApi}/user/refresh`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          refresh_token: token.refreshToken,
        }),
      });

      const data = await res.json();
      return {
        ...token,
        ...data,
      };
    },

    async session({ token, session }) {
      (session.user = token.user),
        (session.accessToken = token.accessToken),
        (session.refreshToken = token.refreshToken);

      return session;
    },
  },
};
