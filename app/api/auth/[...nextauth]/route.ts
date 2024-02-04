import { authOptions } from "@vape/lib/auth";
import NextAuth from "next-auth/next";

export const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
