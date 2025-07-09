import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  secret: "hello", // Ideally use a secure secret from .env

  providers: [
    GoogleProvider({
      clientId: "452176766515-nmsavg3j94mhkn2n4iece951u8k9qdmq.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name,
          });
        }
        return true;
      } catch (error) {
        console.error("signIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // On first login, add user info to token
      if (user) {
        token.id = user.id || user.sub || null;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      try {
        if (!session?.user || !token?.email) return session;

        // Attach user info from token
        session.user.id = token.id ?? null;
        session.user.email = token.email ?? null;
        session.user.name = token.name ?? null;

        const guest = await getGuest(token.email);
        session.user.guestId = guest?.id ?? null;
      } catch (error) {
        console.error("session error:", error);
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
