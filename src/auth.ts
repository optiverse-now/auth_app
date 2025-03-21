"use server";

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const { handlers: authHandlers, auth: nextAuth, signIn: nextSignIn, signOut: nextSignOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("認証失敗: メールアドレスまたはパスワードが提供されていません");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          console.log("認証失敗: ユーザーが見つからないか、パスワードが設定されていません");
          console.log("検索したメールアドレス:", credentials.email);
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          console.log("認証失敗: パスワードが一致しません");
          return null;
        }

        console.log("認証成功:", user.email);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

// 以下の直接エクスポート行を削除する
// export { handlers, auth, signIn, signOut }; ← この行を削除

// 代わりに、すべて非同期関数としてエクスポート
export async function getHandlers() {
  return authHandlers;
}

export async function auth() {
  return nextAuth();
}

export async function getAuth() {
  return nextAuth();
}

export async function handleAuth(request: NextRequest) {
  return authHandlers.GET(request);
}

export async function signIn(provider: string, options?: Record<string, unknown>) {
  return nextSignIn(provider, options);
}

export async function signInAction(provider: string, options?: Record<string, unknown>) {
  return nextSignIn(provider, options);
}

export async function signOut(options?: Record<string, unknown>) {
  return nextSignOut(options);
}

export async function signOutAction() {
  return nextSignOut();
}

export async function getAuthObject() {
  return nextAuth;
}