import { authOptions } from "@vape/lib/auth";
import NextAuth from "next-auth/next";

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };
