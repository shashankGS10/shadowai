import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  }),
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
    updateAge: 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile) {
        token.emailVerified = profile.email_verified ?? false;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.emailVerified = token.emailVerified ?? false;
      }
      return session;
    },
    async signIn({ account, profile }) {
        if (
            account?.provider === "google" &&
            (!profile?.email_verified || !profile.email?.endsWith("@gmail.com"))
          ) {
            console.warn("Blocked sign-in: unverified or non-gmail email.");
            return false;
          }
      return true;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
});

export { handler as GET, handler as POST };
